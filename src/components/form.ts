/**
 * @file 基于动态表单进行功能扩展
 * @author svon.me@gmail.com
 */

import { Form } from "@ue/form";
import { confirm } from "./confirm";

import { ref, toRaw } from "vue";
import type { Component } from "vue";
import type { ModalProps } from "./type";
import type { FormOptionValue, FormLayout as Layout } from "@ue/form";

interface State {
  [key: string]: any;
}

interface Props {
  layout?: Layout | string;
}

const form = function<T = State>(items: FormOptionValue, config?: string | ModalProps, props?: Props): Promise<T> {
  const state = ref<State>({});
  const onUpdate = (value: State) => (state.value = value);

  return new Promise<T>(function(resolve) {
    const opt = config ? (typeof config === "string" ? { title: config } : config) : {};
    const option: ModalProps = Object.assign({ divider: true }, { ...opt }, {
      onCancel: () => {
        if (opt.onCancel) {
          return opt.onCancel();
        }
        resolve(void 0 as T);
      },
      onOk: (value?: State) => {
        const temp = value || toRaw(state.value);
        if (opt.onOk) {
          return opt.onOk(temp);
        }
        resolve(temp as T);
      },
    });

    confirm<Component, T>(Form as Component, option, {
      items,
      option,
      value: state.value,
      class: "confirm-form",
      "onUpdate:value": onUpdate,
      layout: props ? props.layout : void 0
    });
  });
}

export default form;