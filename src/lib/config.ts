import {ModalProps} from "../components/type";

let config: ModalProps = {};

export const SetConfig = function (value?: ModalProps) {
  if (value) {
    config = Object.assign({}, config, value);
  }
}

export const GetConfig = function (): ModalProps {
  return {...config};
}

export const MergeConfig = function (value?: ModalProps): ModalProps {
  if (value) {
    return Object.assign({}, GetConfig(), value);
  }
  return GetConfig();
}