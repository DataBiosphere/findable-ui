import { SelectCategory } from "../../entities";
import { RangeCategory } from "./range/types";

/**
 * Internal filter model of a category.
 */
export type Category = SelectCategory | RangeCategory;
