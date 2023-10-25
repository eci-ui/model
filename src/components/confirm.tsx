/**
 * @file 自定义弹框
 * @author svon.me@gmail.com
 */


import * as _ from "lodash-es";
import { ref, h as createElement } from "vue";
import locale from "ant-design-vue/es/locale/en_US";
import Modal from "ant-design-vue/lib/modal/index";
import { Space, Button, Divider } from "ant-design-vue";

import type { StyleValue } from "vue";
import type { ModalProps } from "./type";


export interface Confirm {
  destroy: () => void;
  update?: (config: ModalProps) => void;
}

export const confirm = function<Value = string, T = object>(value: Value, config: ModalProps, props: object): Promise<T | Confirm> {
  let modalConfirm: Confirm;
  const onCancel = function(callback?: (v?: T) => void) {
    if (config.onCancel) {
      config.onCancel();
    } else if(callback && typeof callback === "function") {
      callback();
    }
    if (modalConfirm && modalConfirm.destroy) {
      modalConfirm.destroy();
    }
  };


  if (_.isNil(config.loading)) {
    config.loading = ref<boolean>(false);
  }

  const onSubmit: any = async function(data: T, callback: (v: T) => void) {
    let status: any = await Promise.resolve(callback(data));
    if (typeof status === "function") {
      config.loading!.value = true;
      try {
        status = await Promise.resolve(status(data));
      } catch (error) {
        status = false;
      }
      config.loading!.value = false;
    } 
    if (typeof status === "boolean" && status === false) {
      return;
    }
    setTimeout(function() {
      onCancel();
    });
  }

  return new Promise(function(resolve) {
    const center = ref<any>(null);
    const option = Object.assign({ 
      width: 800,
      icon: null,
      closable: true,
      okText: locale.Modal?.okText || "Submit",
      cancelText: locale.Modal?.cancelText || "Cancel",
      keyboard: true,
      className: "",
      class: "message-input",
      okButtonProps: {},
      cancelButtonProps: {},
    }, _.omit(config, ["icon", "class"]));
    const onClick = async function(e: Event, data?: T) {
      const submit = center.value?.submit || center.value?.onSubmit;
      if (data) {
        return onSubmit(data, config.onOk || resolve);
      } else if (submit){
        try {
          const result = await submit();
          if (result) {
            return onSubmit(result, config.onOk || resolve);
          }
        } catch (error) {
          // todo
        }
      } else {
        return onSubmit(true, config.onOk || resolve);
      }
    };
    const onClose = function() {
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

    modalConfirm =  Modal.confirm({
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
    if (config.onOk) {
      resolve(modalConfirm);
    }
  });
}