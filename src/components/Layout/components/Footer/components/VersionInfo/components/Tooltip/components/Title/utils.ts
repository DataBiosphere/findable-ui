import { VersionInfo } from "../../../../types";

/**
 * Returns GitHub commit URL for the given git hash.
 * @param gitHubRepoUrl - GitHub repository URL.
 * @param versionInfo - Version info.
 * @returns GitHub commit URL.
 */
export function getCommitUrl(
  gitHubRepoUrl?: string,
  versionInfo?: VersionInfo,
): string {
  if (!gitHubRepoUrl || !versionInfo) return "";
  if (!versionInfo.gitHash) return "";
  return `${gitHubRepoUrl}/commit/${versionInfo.gitHash}`;
}

/**
 * Returns GitHub release URL for the given release version.
 * @param gitHubRepoUrl - GitHub repository URL.
 * @param versionInfo - Version info.
 * @returns GitHub release URL.
 */
export function getReleaseUrl(
  gitHubRepoUrl?: string,
  versionInfo?: VersionInfo,
): string {
  if (!gitHubRepoUrl || !versionInfo) return "";
  if (!versionInfo.version) return "";
  return `${gitHubRepoUrl}/releases/tag/${versionInfo.version}`;
}
