import type { VNode } from "vue";
import type { FormOption } from "@ue/form";
import type { LegacyButtonType } from "ant-design-vue/lib/button/buttonTypes";

type VueNode = JSX.Element | VNode;

export interface ModalProps extends FormOption{
  otherOk?: (...args: any[]) => any;
  otherText?: string | (() => VueNode) | VueNode;
  otherType?: LegacyButtonType;
  buttonClassName?: string | string[];
}