import { transformRoute } from "../src/hooks/authentication/session/useSessionActive";

describe("transformRoute", () => {
  it("should return the first non-login route without the inactivity param", () => {
    const routes = ["/login", "/route1?inactivityTimeout=true", "/route2"];
    const result = transformRoute(routes);
    expect(result).toBe("/route1");
  });

  it("should remove the inactivity param from the route", () => {
    const routes = ["/route1?inactivityTimeout=true"];
    const result = transformRoute(routes);
    expect(result).toBe("/route1");
  });

  it("should return undefined if all routes are login routes", () => {
    const routes = ["/login"];
    const result = transformRoute(routes);
    expect(result).toBeUndefined();
  });
});
