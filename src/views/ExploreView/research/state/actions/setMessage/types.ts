import { MessageResponse } from "../../types";
import { ChatActionKind } from "../types";

/**
 * Action to set the message for a chat.
 */
export interface SetMessageAction {
  payload: SetMessagePayload;
  type: ChatActionKind.SetMessage;
}

/**
 * Payload for the SetMessage action.
 */
export interface SetMessagePayload<
  R extends MessageResponse = MessageResponse,
> {
  response: R;
}
