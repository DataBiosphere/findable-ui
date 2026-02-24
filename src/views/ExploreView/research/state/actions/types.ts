import { SetResponseAction } from "./setResponse/types";

/**
 * Union of all Chat actions.
 */
export type ChatAction = SetResponseAction;

/**
 * Action kind identifiers for the Chat reducer.
 */
export enum ChatActionKind {
  SetResponse = "SET_RESPONSE",
}
