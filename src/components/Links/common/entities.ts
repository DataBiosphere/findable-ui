import { UrlObject } from "url";

export enum ANCHOR_TARGET {
  BLANK = "_blank",
  SELF = "_self",
}

export type Url = string | Pick<UrlObject, "href" | "query">;
