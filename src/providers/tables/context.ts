import { createContext } from "react";
import { TablesContextValue } from "./types";

export const TablesContext = createContext<TablesContextValue | null>(null);
