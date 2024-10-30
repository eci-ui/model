import {Modal as modal} from "ant-design-vue";


type Modal = typeof modal;

let __modal: Modal | undefined;
export const GetModal = function (): Modal {
  if (__modal) {
    return __modal;
  }
  return modal;
}

export const SetModal = function (modal?: Modal): void {
  __modal = modal;
}