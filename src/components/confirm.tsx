/**
 * @file 自定义弹框
 * @author svon.me@gmail.com
 */

import { ref, h as createElement } from "vue";
import Modal from "ant-design-vue/lib/modal/index";
import { Space, Button, Divider } from "ant-design-vue";

import type { Confirm } from "types/confirm";
import type { ModalFuncProps } from "ant-design-vue";

export const confirm = function<Value = string, T = object>(value: Value, config: ModalFuncProps, props: object): Promise<T | Confirm> {
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
    const option = { 
      width: 800,
      icon: null,
      closable: true,
      okText: "Submit",
      cancelText: "Cancel",
      keyboard: true,
      className: "",
      ...config,
      class: "message-input",
    };
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
      <div class="text-center pt-3">
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
        const className = option["className"] || ["px-6", "py-3"];
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
        return (<div class={ className }>{ createElement(value as any, attr, slots) }</div>);
      },
    });
    if (config.onOk) {
      resolve(modalConfirm);
    }
  });
}