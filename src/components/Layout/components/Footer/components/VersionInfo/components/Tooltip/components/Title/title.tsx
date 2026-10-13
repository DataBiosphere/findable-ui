import { Typography } from "@mui/material";
import { JSX } from "react";
import { useConfig } from "../../../../../../../../../../hooks/useConfig";
import { TYPOGRAPHY_PROPS } from "../../../../../../../../../../styles/common/mui/typography";
import { Link } from "../../../../../../../../../Links/components/Link/link";
import { VersionInfoProps } from "../../../../types";
import { getGitHash, getVersion } from "../../../../utils";
import { LINK_PROPS } from "./constants";
import { getCommitUrl, getReleaseUrl } from "./utils";

/**
 * Version info tooltip title, listing the build date, version, git commit and catalog.
 * When the config's GitHub URL is set, a set version links to its GitHub release and a set git commit links to its GitHub commit; the build date, git commit and catalog are shown only when set.
 * @param props - Component props.
 * @param props.versionInfo - Version info.
 * @returns The version info tooltip title, or null when there is no version info.
 */
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
