/**
 * @file 弹框
 * @author svon.me@gmail.com
 */

import "./style/model.scss";
import form from "./components/form";
import { h as createElement } from "vue";
import { confirm as model } from "./components/confirm";
import type { ModalFuncProps } from "ant-design-vue";

export { model, form };

export const confirm = function<Value = string, T = object, Props = object>(value: Value, config?: string | ModalFuncProps, props?: Props) {
  const option = {};
  if (config && typeof config === "string") {
    Object.assign(option, { title: config });
  } else if (config && typeof config === "object") {
    Object.assign(option, config);
  };
  return model<Value, T>(value, option, props || {});
};

export const iframe = function(src: string) {
  const iframe = createElement("iframe", { 
    src, 
    width: "100%",
    height: "100%",
    border: "0",
    frameborder: "0",
    marginwidth: "0",
    marginheight: "0",
    scrolling: "no",
  });
  const config = {
    width: "100%",
    "class": "h-full",
    wrapClassName: "full-modal"
  };
  return confirm(iframe, config as ModalFuncProps);
}