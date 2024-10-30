import toVNode from "./node";
import {toConfig} from "./config";
import {confirm as modal} from "../components/confirm";
import type {ModalProps} from "../components/type";

const confirm = function <Value = string, T = object, Props = object>(value: Value, config?: string | ModalProps, props?: Props) {
  const option: ModalProps = {divider: true, ...toConfig(config)};
  if (typeof value === "string" || typeof value === "number") {
    return modal<Value, T>(toVNode(value), option, props || {});
  }
  return modal<Value, T>(value, option, props || {});
};

export default confirm;