import {h as createElement, defineComponent} from "vue";

import type {VNode} from "vue";

const toVNode = function <Value>(value: Value): any {
  return defineComponent({
    setup(_, {slots}) {
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
        } else if (item) {
          content.push(createElement(item));
        }
      }
      return () => {
        return createElement("div", {}, [
          createElement("div", {style: {"paddingBottom": "12px"}}, content),
          createElement("div", {}, vSlots)
        ]);
      };
    }
  });
};

export default toVNode;