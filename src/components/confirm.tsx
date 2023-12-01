/**
 * @file 自定义弹框
 * @author svon.me@gmail.com
 */


import * as _ from "lodash-es";
import { GetModal } from "../lib/modal";
import { ref, h as createElement } from "vue";
import { getAppContext } from "../utils/config";
import locale from "ant-design-vue/es/locale/en_US";
import { Space, Button, Divider } from "ant-design-vue";

import type { StyleValue } from "vue";
import type { ModalProps } from "./type";

type Result<T> = T | boolean | undefined;
type Callback<T> = (value?: Result<T>) => Result<T>;

export interface Confirm {
  destroy: () => void;
  update?: (config: ModalProps) => void;
}

export const confirm = function<Value = string, T = object>(value: Value, config: ModalProps, props: object): Promise<T | boolean | undefined> {
  let modalConfirm: Confirm;
  const onCancel = function(callback?: Callback<T>) {
    if (config.onCancel && typeof config.onCancel === "function") {
      config.onCancel();
    }

    if(callback && typeof callback === "function") {
      callback();
    }

    if (modalConfirm && modalConfirm.destroy) {
      modalConfirm.destroy();
    }
  };

  if (_.isNil(config.loading)) {
    config.loading = ref<boolean>(false);
  }

  const onSubmit: any = async function(data: T, callback?: Callback<T>) {
    let res: boolean | T = data;
    // 判断回调函数
    if (callback && typeof callback === "function") {
      config.loading!.value = true;
      // 执行回调函数
      try {
        const value: Callback<T> | Result<T>  = await Promise.resolve(callback(data));
        // 如果回调函数执行结果是函数，则继续执行
        if (typeof value === "function") {
          res = await onSubmit(data, value);
        } else {
          res = value as T;
        }
      } catch (e) {
        res = false;
      }
      config.loading!.value = false;
    }
    return res;
  }

  return new Promise(function(resolve) {
    const center = ref<any>(null);
    const option = Object.assign({ 
      width: 800,
      icon: null,
      closable: true,
      okText: locale.Modal?.okText || "Confirm",
      cancelText: locale.Modal?.cancelText || "Cancel",
      keyboard: true,
      className: "",
      class: "ue-modal-main",
      okButtonProps: {},
      cancelButtonProps: {},
      appContext: getAppContext(),
    }, _.omit(config, ["icon", "class"]));
    const onClick = async function(e: Event, data?: T) {
      let value: any;
      const submit = center.value?.onSubmit || center.value?.submit;
      if (data) {
        value = await onSubmit(data, config.onOk);
      } else if (submit){
        try {
          const res = await submit();
          if (res) {
            value = await onSubmit(res, config.onOk);
          } else {
            value = false;
          }
        } catch (error) {
          // todo
        }
      } else {
        value = await onSubmit(true, config.onOk);
      }
      if (typeof value === "boolean" && value === false) {
        return;
      }
      if (value) {
        setTimeout(() => {
          onCancel();
        });
      }
      return resolve(value);
    };
    const onClose = function(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target) {
        // 拦截 input file 暴露的 cancel 事件
        const tagName = (target.tagName || "").toLowerCase();
        const type = target.getAttribute ? target.getAttribute("type") : "";
        if (tagName === "input" && type === "file") {
          return false;
        }
      }
      // @ts-ignore
      onCancel(resolve);
    }

    const textAlign: string = option.textAlign ? option.textAlign : "center";
    const buttonStyle: StyleValue = {
      "padding": "12px 24px 0", 
      "textAlign": textAlign as any
    }
    const buttons = (<div style="margin: 0 -24px;">
      { option.divider ? <Divider style="margin: 0;"></Divider> : void 0 }
      <div style={ buttonStyle }>
        <Space>
          <Button { ...option.cancelButtonProps } onClick={ onClose }>{ option.cancelText }</Button>
          <Button type="primary" loading={ option.loading?.value } { ...option.okButtonProps } onClick={ onClick }>{ option.okText }</Button>
        </Space>
      </div>
    </div>);

    modalConfirm = GetModal().confirm({
      ...option,
      onCancel: onClose,
      content: function(): any {
        const slots = { buttons };
        const attr = {
          ...props,
          ref: center,
          onSubmit (e: Event, v: T) {
            return onClick(e, v);
          },
          onCancel: onClose
        };
        
        return (<div class={ config.class } style={ config.class ? {} : {"padding": "12px 24px"}}>
          {
            createElement(value as any, attr, slots)
          }
        </div>);
      },
    });
  });
}