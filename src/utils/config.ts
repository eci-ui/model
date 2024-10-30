import type {App, AppContext} from "vue";
import type {ModalProps} from "../components/type";


let appContext: AppContext | undefined;

export const setAppContext = function (app: App) {
  appContext = app._context;
}

export const getAppContext = function () {
  return appContext;
};


export const toConfig = function (config?: string | ModalProps): ModalProps {
  if (config && typeof config === "string") {
    return {title: config};
  } else if (config && typeof config === "object") {
    return config;
  }
  return {};
};