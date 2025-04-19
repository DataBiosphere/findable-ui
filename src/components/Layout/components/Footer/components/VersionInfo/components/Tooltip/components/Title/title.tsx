import { Typography } from "@mui/material";
import React from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../../styles/common/mui/typography";
import { Link } from "../../../../../../../../../Links/components/Link/link";
import { VersionInfoProps } from "../../../../types";
import { getGitHash, getVersion } from "../../../../utils";
import { LINK_PROPS } from "./constants";
import { getCommitUrl, getReleaseUrl } from "./utils";

export const Title = ({
  versionInfo,
}: Pick<VersionInfoProps, "versionInfo">): JSX.Element | null => {
  const {
    config: { gitHubUrl },
  } = useConfig();
  if (!versionInfo) return null;
  const { buildDate, catalog, gitHash, version } = versionInfo;
  return (
    <Typography
      component="div"
      variant={TYPOGRAPHY_PROPS.VARIANT.BODY_SMALL_400_2_LINES}
    >
      {buildDate && (
        <div>
          <span>Build Date: </span>
          <span>{buildDate}</span>
        </div>
      )}
      <div>
        <span>Version: </span>
        <Link
          {...LINK_PROPS}
          label={getVersion(version)}
          url={getReleaseUrl(gitHubUrl, versionInfo)}
        />
      </div>
      {gitHash && (
        <div>
          <span>Git Commit: </span>
          <Link
            {...LINK_PROPS}
            label={getGitHash(gitHash)}
            url={getCommitUrl(gitHubUrl, versionInfo)}
          />
        </div>
      )}
      {catalog && (
        <div>
          <span>Catalog: </span>
          <span>{catalog}</span>
        </div>
      )}
    </Typography>
  );
};
