import { UrlObject } from "url";

export enum ANCHOR_TARGET {
  BLANK = "_blank",
  SELF = "_self",
}

export type StrictUrlObject = Omit<UrlObject, "href" | "query"> & {
  href: string;
  query: string;
};

export type Url = string | UrlObjectWithHrefAndQuery;

export type UrlObjectWithHrefAndQuery = Pick<StrictUrlObject, "href" | "query">;
