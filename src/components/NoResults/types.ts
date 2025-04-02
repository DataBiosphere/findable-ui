import { ReactNode } from "react";
import {
  FlatPaper,
  FluidPaper,
  RoundedPaper,
} from "../common/Paper/paper.styles";

export interface NoResultsProps {
  actions?: ReactNode;
  description?: string;
  Paper: typeof FlatPaper | typeof FluidPaper | typeof RoundedPaper | null;
  title: string;
}
