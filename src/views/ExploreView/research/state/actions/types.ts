import { SetMessageAction } from "./setMessage/types";
import { SetQueryAction } from "./setQuery/types";
import { SetStatusAction } from "./setStatus/types";

/**
 * Union of all Chat actions.
 */
export type ChatAction = SetMessageAction | SetQueryAction | SetStatusAction;

/**
 * Action kind identifiers for the Chat reducer.
 */
export enum ChatActionKind {
  SetMessage = "SET_MESSAGE",
  SetQuery = "SET_QUERY",
  SetStatus = "SET_STATUS",
}
