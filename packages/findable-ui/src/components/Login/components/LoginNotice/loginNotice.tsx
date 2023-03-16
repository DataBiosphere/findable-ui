import { Link, Typography } from "@mui/material";
import NLink from "next/link";
import React from "react";

export interface LoginNoticeProps {
  conditionsUrl: string;
  privacyUrl: string;
}

export const LoginNotice = ({
  conditionsUrl,
  privacyUrl,
}: LoginNoticeProps): JSX.Element => {
  return (
    <Typography color="ink.light" variant="text-body-small-400">
      By logging in, you agree to the{" "}
      <NLink href={privacyUrl} passHref>
        <Link>privacy notice</Link>
      </NLink>{" "}
      and{" "}
      <NLink href={conditionsUrl} passHref>
        <Link>conditions of use</Link>
      </NLink>
    </Typography>
  );
};
