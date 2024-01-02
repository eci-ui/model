/**
 * @file test
 * @author svon.me@gmail.com
 */

import "./style.less"
import Demo from "./demo.vue";
import modal, { SetConfig } from "../src/index";
import { createApp as create } from "vue";

import "ant-design-vue/dist/antd.css";

import enUS from "ant-design-vue/es/locale/en_US";

import type { App } from "vue";

SetConfig({
  buttonClassName: ["px-5", "pb-5"]
})

function App() {
  if (enUS.Modal) {
    enUS.Modal.okText = "Submit";
    enUS.Modal.cancelText = "Cancel";
  } else {
    enUS.Modal = {
      okText: "Submit",
      cancelText: "Cancel",
      justOkText: "OK"
    };
  }
  const app: App = create(Demo);
  app.use(modal);
  app.mount("#app");;
}

setTimeout(App);
