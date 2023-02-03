/**
 * @file 弹框
 * @author svon.me@gmail.com
 */
import type { Confirm } from "./confirm";
import type { ModalFuncProps } from "ant-design-vue";
export declare const confirm: <Value = string, T = object, Props = object>(value: Value, config?: string | ModalFuncProps, props?: Props) => Promise<T | Confirm>;
export declare const iframe: (src: string) => Promise<Confirm>;
