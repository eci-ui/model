
import confirm from "./confirm";
import { h as createElement } from "vue";
import type { ModalProps } from "../components/type";

const iframe = function(src: string) {
  const iframe = createElement("iframe", { 
    src, 
    width: "100%",
    height: "100%",
    border: "0",
    frameborder: "0",
    marginwidth: "0",
    marginheight: "0",
    scrolling: "no",
  });
  const config: ModalProps = {
    width: "100%",
    "class": "h-full",
    wrapClassName: "full-ue-modal"
  };
  return confirm(iframe, config);
};

export default iframe;