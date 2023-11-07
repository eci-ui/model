/**
 * @file 基于动态表单进行功能扩展
 * @author svon.me@gmail.com
 */

import { Form } from "@ue/form";
import { toConfig } from "./config";
import { ref, toRaw } from "vue";
import { confirm } from "../components/confirm";

import type { Component } from "vue";
import type { ModalProps } from "../components/type";
import type { FormOptionValue, FormLayout as Layout } from "@ue/form";

export interface State {
  [key: string]: any;
}

export interface Props {
  layout?: Layout | string;
}

const form = function<T = State>(items: FormOptionValue, config?: string | ModalProps, props?: Props) {
  const opt = toConfig(config);

  const state = ref<State>({});
  const onUpdate = (value: State) => {
    state.value = value;
  };
  const option: ModalProps = Object.assign({ divider: true }, opt, {
    onOk: (value?: State) => {
      const temp = value || toRaw(state.value);
      const res = { ...temp };
      if (opt.onOk && typeof opt.onOk === "function") {
        return opt.onOk(res);
      }
      return res;
    },
  });

  return confirm<Component, T>(Form as Component, option, {
    items,
    option,
    value: state.value,
    class: "confirm-form",
    "onUpdate:value": onUpdate,
    layout: props ? props.layout : void 0
  });
}

export default form;