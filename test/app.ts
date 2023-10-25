/**
 * @file test
 * @author svon.me@gmail.com
 */

import Demo from "./demo.vue";
import { createApp as create } from "vue";

import "ant-design-vue/dist/antd.css";

import enUS from "ant-design-vue/es/locale/en_US";

import type { App } from "vue";

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
  app.mount("#app");;
}

setTimeout(App);
