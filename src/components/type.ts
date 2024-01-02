import type { VNode } from "vue";
import type { FormOption } from "@ue/form";
import type { LegacyButtonType } from "ant-design-vue/lib/button/buttonTypes";

export interface ModalProps extends FormOption{
  otherOk?: (...args: any[]) => any;
  otherText?: string | (() => VNode) | VNode;
  otherType?: LegacyButtonType;
  buttonClassName?: string | string[];
}