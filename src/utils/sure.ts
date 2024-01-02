
import toVNode from "./node";
import confirm from "./confirm";
import { toConfig } from "./config";
import { h as createElement } from "vue";
import type { VNode, Component } from "vue";

import type { ModalProps } from "../components/type";
const sure = function(content: string | VNode | Component | Array<string | VNode | Component>, config?: string | ModalProps) {
  const option: ModalProps = {
    width: 416,
    okText: "OK",
    closable: false,
    divider: false,
    textAlign: "right",
    style: {
      padding: "20px"
    },
    buttonClassName: [],
    ...toConfig(config)
  };
  return confirm(toVNode(content), option);
}

export default sure;