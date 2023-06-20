import type { Ref } from "vue";
import type { ModalFuncProps as ModalProps } from "ant-design-vue";

export interface ModalFuncProps extends ModalProps{
  loading?: Ref<boolean>;
}