/**
 * @file 弹框
 * @author svon.me@gmail.com
 */

import "./style/modal.less";
import form from "./components/form";
import { confirm as modal } from "./components/confirm";
import { h as createElement, defineComponent } from "vue";

import type { VNode, Component } from "vue";
import type { ModalProps } from "./components/type";

export { modal, form, ModalProps };

const toVNode = function<Value>(value: Value): any {
  return defineComponent({
    setup(_, { slots }) {
      const vSlots: any[] = [];
      for (const name of Object.keys(slots)) {
        // @ts-ignore
        vSlots.push(slots[name]());
      }
      const content: VNode[] = [];
      // @ts-ignore
      const list: any[] = [].concat(value);
      for (const item of list) {
        if (typeof item === "string" || typeof item === "number") {
          content.push(createElement("div", {}, item));
        } else if (item){
          content.push(createElement(item));
        }
      }
      return () => {
        return createElement("div", {}, [
          createElement("div", {style: { "padding": "0 0 12px" } }, content),
          createElement("div", {}, vSlots)
        ]);
      };
    }
  });
}

export const confirm = function<Value = string, T = object, Props = object>(value: Value, config?: string | ModalProps, props?: Props) {
  const option: ModalProps = {
    divider: true,
  };
  if (config && typeof config === "string") {
    Object.assign(option, { title: config });
  } else if (config && typeof config === "object") {
    Object.assign(option, config);
  };
  if (typeof value === "string" || typeof value === "number") {
    return modal<Value, T>(toVNode(value), option, props || {});  
  }
  return modal<Value, T>(value, option, props || {});
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
  const config: ModalProps = {
    width: "100%",
    "class": "h-full",
    wrapClassName: "full-ue-modal"
  };
  return confirm(iframe, config);
};

export const sure = function(content: string | VNode | Component | Array<string | VNode | Component>, config?: string | ModalProps) {
  const option: ModalProps = {
    width: 416,
    okText: "OK",
    closable: false,
    divider: false,
    textAlign: "right",
  };
  if (config && typeof config === "string") {
    Object.assign(option, { title: config });
  } else if (config && typeof config === "object") {
    Object.assign(option, config);
  }
  return confirm(toVNode(content), option);
}