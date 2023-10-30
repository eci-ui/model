import sure from "./sure";
import form from "./form";
import toVNode from "./node";
import iframe from "./iframe";
import confirm from "./confirm";
import { toConfig } from "./config";

import { getCurrentInstance } from "vue";

import type { VNode, Component } from "vue";
import type { FormOptionValue } from "@ue/form";
import type { ModalProps } from "../components/type";
import type { State, Props as FormProps } from "./form";

export { sure, form, toVNode, iframe, confirm };


export const useModal = function() {
  const appContext = getCurrentInstance()?.appContext;

  return {
    iframe,
    toVNode,
    sure: function(content: string | VNode | Component | Array<string | VNode | Component>, config?: string | ModalProps) {
      const option = { appContext, ...toConfig(config) };
      return sure(content, option);
    },
    form: function<T = State>(items: FormOptionValue, config?: string | ModalProps, props?: FormProps): Promise<T> {
      const option = { appContext, ...toConfig(config) };
      return form<T>(items, option, props);
    },
    confirm: function<Value = string, T = object, Props = object>(value: Value, config?: string | ModalProps, props?: Props) {
      const option = { appContext, ...toConfig(config) };
      return confirm<Value, T, Props>(value, option, props);
    }
  };
}