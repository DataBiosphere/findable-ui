import { Fragment, JSX } from "react";
import { EntityListStrategyProps } from "../../EntityListStrategy/types";

/**
 * NA strategy for entity list handling i.e. no fetch / filter strategy.
 *
 * Used as a fallback for explore modes that handle data outside of the
 * entity list strategy system.
 *
 * @typeParam T - Entity type.
 * @param props - Component props.
 * @param props.children - Children.
 * @returns Rendered children with no data.
 */
export const NAFetchNAFilter = <T = unknown,>({
  children,
}: EntityListStrategyProps<T>): JSX.Element => {
  return <Fragment>{children({})}</Fragment>;
};
