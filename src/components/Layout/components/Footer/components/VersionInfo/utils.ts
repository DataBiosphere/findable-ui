import { VersionInfo } from "./types";

/**
 * Returns displayable shortened version of Git hash.
 * @param gitHash - Git hash.
 * @returns displayable shortened version of Git hash.
 */
export function getGitHash(gitHash?: string): string | undefined {
  return gitHash?.substring(0, 7);
}

/**
 * Returns Chip label based on version info.
 * @param versionInfo - Version info.
 * @returns Chip label.
 */
export function getLabel(versionInfo?: VersionInfo): string | undefined {
  if (!versionInfo) return;
  const { catalog, gitHash, version } = versionInfo;
  return [getVersion(version), getGitHash(gitHash), catalog]
    .filter(Boolean)
    .join("-");
}

/**
 * Returns displayable version, or "Unversioned" if version is not provided.
 * @param version - Version info.
 * @returns Version.
 */
export function getVersion(version?: string): string {
  return version || "Unversioned";
}
