/**
 * @file 自定义弹框
 * @author svon.me@gmail.com
 */

import I18n from "@ue/i18n";
import * as _ from "lodash-es";
import { ref, h as createElement } from "vue";
import Modal from "ant-design-vue/lib/modal/index";
import { Space, Button, Divider } from "ant-design-vue";

import type { ModalFuncProps } from "ant-design-vue";

export interface Confirm {
  destroy: () => void;
  update?: (config: ModalFuncProps) => void;
}

export const confirm = function<Value = string, T = object>(value: Value, config: ModalFuncProps, props: object): Promise<T | Confirm> {
  const i18n = I18n();
  let modalConfirm: Confirm;
  const onCancel = function() {
    if (config.onCancel) {
      config.onCancel();
    }
    modalConfirm.destroy();
  };
  const onSubmit: any = async function(data: T, callback: (v: T) => void) {
    const status = await Promise.resolve(callback(data));
    if (typeof status === "boolean" && status === false) {
      return;
    }
    setTimeout(onCancel);
  }

  return new Promise(function(resolve) {
    const center = ref<any>(null);
    const option = Object.assign({ 
      width: 800,
      icon: null,
      closable: true,
      okText: i18n.common.button.submit,
      cancelText: i18n.common.button.cancel,
      keyboard: true,
      className: "",
      class: "message-input",
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
        return onSubmit(void 0, config.onOk || resolve);
      }
    };
    const buttons = (<div>
      <Divider class="m-0" />
      <div style={{ "text-align": "center", "padding-top": "12px" }}>
        <Space>
          <Button onClick={ onCancel }>{ option.cancelText }</Button>
          <Button type="primary" onClick={ onClick }>{ option.okText }</Button>
        </Space>
      </div>
    </div>);
    modalConfirm =  Modal.confirm({
      ...option,
      content: function(): any {
        const slots = { buttons };
        const attr = {
          ...props,
          ref: center,
          onSubmit (e: Event, value: T) {
            return onClick(e, value);
          },
          onCancel () {
            return onCancel();
          }
        };
        
        return (<div class={ config.class } style={ config.class ? {} : {"padding": "12px 24px"}}>
          {
            typeof value === "string" ? <><p>{ value }</p>{ buttons }</> : createElement(value as any, attr, slots) 
          }
        </div>);
      },
    });
    if (config.onOk) {
      resolve(modalConfirm);
    }
  });
}