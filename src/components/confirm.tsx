/**
 * @file 自定义弹框
 * @author svon.me@gmail.com
 */


import * as _ from "lodash-es";
import * as dom from "../utils/dom";
import CloseView from "./close.vue";
import {GetModal} from "../lib/modal";
import {ref, h as createElement} from "vue";
import {getAppContext} from "../utils/config";
import locale from "ant-design-vue/es/locale/en_US";
import {Space, Button} from "ant-design-vue";
import {MergeConfig} from "../lib/config";

import type {ModalProps} from "./type";
import type {ButtonType} from "ant-design-vue/lib/button";

type Result<T> = T | boolean | undefined;
type Callback<T> = (value?: Result<T>) => Result<T>;

export interface Confirm {
  destroy: () => void;
  update?: (config: ModalProps) => void;
}

export const confirm = function <Value = string, T = object>(value: Value, config: ModalProps, props: object): Promise<T | boolean | undefined> {
  let modalConfirm: Confirm;

  config = MergeConfig(config);

  const onCancel = async function (callback?: Callback<T>) {
    if (config.onCancel && typeof config.onCancel === "function") {
      config.loading!.value = true;
      let status: boolean = true;
      try {
        status = await config.onCancel();
      } catch (error) {
        // todo
      }
      config.loading!.value = false;
      if (typeof status === "boolean" && status === false) {
        return false;
      }
    }

    if (callback && typeof callback === "function") {
      callback();
    }

    if (modalConfirm && modalConfirm.destroy) {
      modalConfirm.destroy();
    }
  };

  if (_.isNil(config.loading)) {
    config.loading = ref<boolean>(false);
  }

  const onSubmit = async function (data: T, callback?: Callback<T>): Promise<boolean | T> {
    let res: boolean | T = data;
    // 判断回调函数
    if (callback && typeof callback === "function") {
      config.loading!.value = true;
      // 执行回调函数
      try {
        const value: Callback<T> | Result<T> = await Promise.resolve(callback(data));
        // 如果回调函数执行结果是函数，则继续执行
        if (typeof value === "function") {
          res = await onSubmit(data, value as Callback<T>);
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

  const btnType = ref<string>("");

  const MakeSubmit = function (resolve: (value: T) => void, callback?: Callback<T>, submit?: () => T) {
    return async function (data?: T) {
      let value: any;
      if (data) {
        value = await onSubmit(data, callback);
      } else if (submit) {
        try {
          const res = await submit();
          if (res) {
            value = await onSubmit(res, callback);
          } else {
            value = false;
          }
        } catch (error) {
          // todo
        }
      } else {
        value = await onSubmit(true as T, callback);
      }
      btnType.value = "";
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
  }

  return new Promise(function (resolve) {
    const center = ref<any>(null);
    const option = Object.assign({
      width: 800,
      icon: null,
      closable: true,
      okType: "primary" as ButtonType,
      okText: locale.Modal?.okText || "Confirm",
      cancelText: locale.Modal?.cancelText || "Cancel",
      // otherText: "Next",
      otherType: "primary" as ButtonType,
      keyboard: true,
      className: "",
      class: ["ue-modal-main", config.fullScreen ? "full-screen" : ""],
      okButtonProps: {},
      cancelButtonProps: {},
      appContext: getAppContext(),
      otherProp: {},
    }, _.omit(config, ["icon", "class"]));

    if (option.width && /^\d+$/.test(String(option.width))) {
      const bodyStyle = {"--modal-width": `${option.width}px`};
      Object.assign(option, {width: null, bodyStyle});
    } else if (option.width && typeof option.width === "string") {
      const bodyStyle = {"--modal-width": option.width};
      Object.assign(option, {width: null, bodyStyle});
    } else {
      const bodyStyle = {"--modal-width": "800px"};
      Object.assign(option, {width: null, bodyStyle});
    }

    const onClose = function (e: Event) {
      if (option.loading?.value) {
        return false;
      }
      btnType.value = "cancel";
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

    const onSubmit1 = function (_e?: Event, v?: T) {
      if (option.loading?.value) {
        return false;
      }
      btnType.value = "submit1";
      const submit = center.value?.onSubmit || center.value?.submit;
      const click = MakeSubmit(resolve, config.onOk as Callback<T>, submit);
      return click(v);
    }

    const onSubmit2 = function (_e?: Event, v?: T) {
      if (option.loading?.value) {
        return false;
      }
      btnType.value = "submit2";
      const submit = center.value?.onOther || center.value?.other;
      const click = MakeSubmit(resolve, config.otherOk as Callback<T>, submit);
      return click(v);
    }

    const textAlign: string = option.textAlign ? option.textAlign : "center";
    const buttons = (<div class={option.buttonClassName} style={`text-align: ${textAlign}`}>
      <Space size="middle">
        <Button loading={btnType.value === "cancel" && option.loading?.value} {...option.cancelButtonProps}
                onClick={onClose}>{option.cancelText}</Button>
        <Button type={option.okType}
                loading={btnType.value === "submit1" && option.loading?.value} {...option.okButtonProps}
                onClick={onSubmit1}>{option.okText}</Button>
        {option.otherText && <Button type={option.otherType} {...option.otherProp}
                                     loading={btnType.value === "submit2" && option.loading?.value} {...option.okButtonProps}
                                     onClick={onSubmit2}>{option.otherText}</Button>}
      </Space>
    </div>);


    let closeIcon: any;

    if (option.fullScreen) {
      let status = false;
      const onFullScreen = function (e: Event) {
        const parent = dom.parent(e.target as HTMLElement, "ue-modal-main");
        if (parent) {
          if (status) {
            status = false;
            dom.removeClass(parent, "on");
          } else {
            status = true;
            dom.addClass(parent, "on");
          }
        }
      }
      closeIcon = (<CloseView onClose={onClose} onFull={onFullScreen}></CloseView>);
    }

    modalConfirm = GetModal().confirm({
      ..._.omit(option, ["style", "fullScreen"]),
      onCancel: onClose,
      content: function (): any {
        const slots = {buttons};
        const attr = {
          ...props,
          ref: center,
          onCancel: onClose,
          onSubmit: function (e?: Event, v?: T) {
            return onSubmit1(e, v);
          },
          onOther: function (e?: Event, v?: T) {
            return onSubmit2(e, v);
          }
        };

        const modalValue = function () {
          if (config["class"] || option["style"]) {
            return createElement("div", {
              "class": config["class"],
              "style": option["style"]
            }, createElement(value as any, attr, slots))
          } else {
            return createElement(value as any, attr, slots)
          }
        };
        if (closeIcon) {
          return (<>
            {closeIcon}
            {modalValue()}
          </>);
        } else {
          return modalValue();
        }
      },
    });
  });
}