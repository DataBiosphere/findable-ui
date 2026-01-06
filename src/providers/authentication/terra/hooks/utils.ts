import { AuthService } from "../../../../config/entities";

/**
 * Returns service endpoint.
 * @param services - Services.
 * @param serviceId - Service ID.
 * @param endpointId - Endpoint ID.
 * @returns Service endpoint.
 */
export function getServiceEndpoint(
  services: AuthService[] | undefined,
  serviceId: string,
  endpointId: string,
): string | undefined {
  return findService(services, serviceId)?.endpoint[endpointId];
}

/**
 * Find a service by service ID.
 * @param services - Services.
 * @param serviceId - Service ID.
 * @returns Service.
 */
export function findService(
  services: AuthService[] | undefined,
  serviceId: string,
): AuthService | undefined {
  return services?.find(({ id }) => id === serviceId);
}
