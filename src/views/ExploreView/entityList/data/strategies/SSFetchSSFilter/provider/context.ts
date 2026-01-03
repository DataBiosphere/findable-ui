import { createContext } from "react";
import { ServerDataContextProps } from "./types";

export const ServerDataContext = createContext<ServerDataContextProps>({
  pageCount: 0,
});
