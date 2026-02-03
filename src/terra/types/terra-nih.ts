/**
 * Dataset permission.
 */
interface DatasetPermission {
  authorized: boolean;
  name: string;
}

/**
 * Terra NIH response.
 */
export interface TerraNIHResponse {
  datasetPermissions: DatasetPermission[];
  linkedNihUsername: string;
  linkExpireTime: number;
}
