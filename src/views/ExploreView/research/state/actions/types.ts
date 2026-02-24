import { SetMessageAction } from "./setMessage/types";

/**
 * Union of all Chat actions.
 */
export type ChatAction = SetMessageAction;

/**
 * Action kind identifiers for the Chat reducer.
 */
export enum ChatActionKind {
  SetMessage = "SET_MESSAGE",
}
