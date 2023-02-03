
import type { ModalFuncProps } from "ant-design-vue";

export interface Confirm {
  destroy: () => void;
  update?: (config: ModalFuncProps) => void;
}