import { UrlObject } from "url";

export enum ANCHOR_TARGET {
  BLANK = "_blank",
  SELF = "_self",
}

export enum REL_ATTRIBUTE {
  NO_OPENER = "noopener",
  NO_OPENER_NO_REFERRER = "noopener noreferrer",
}

export type StrictUrlObject = Omit<UrlObject, "href" | "query"> & {
  href: string;
  query: string;
};

export type Url = string | UrlObjectWithHrefAndQuery;

export type UrlObjectWithHrefAndQuery = Pick<StrictUrlObject, "href" | "query">;
