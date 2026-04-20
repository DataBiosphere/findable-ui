import { mapProfile } from "../src/google/utils/profile";
import { GoogleProfile } from "../src/google/types";

const FULL_GOOGLE_PROFILE: GoogleProfile = {
  email: "test@example.com",
  email_verified: true,
  family_name: "User",
  given_name: "Test",
  hd: "example.com",
  locale: "en",
  name: "Test User",
  picture: "https://example.com/photo.jpg",
  sub: "123456789",
};

const MINIMAL_GOOGLE_PROFILE: GoogleProfile = {
  email: "minimal@example.com",
  email_verified: true,
  family_name: "",
  given_name: "",
  hd: "",
  locale: "en",
  name: "",
  picture: "",
  sub: "987654321",
};

describe("mapProfile (Google)", () => {
  it("maps full Google profile to UserProfile", () => {
    const result = mapProfile(FULL_GOOGLE_PROFILE);
    expect(result).toEqual({
      email: "test@example.com",
      id: "google",
      image: "https://example.com/photo.jpg",
      name: "Test User",
    });
  });

  it("constructs name from given_name and family_name", () => {
    const profileWithNames: GoogleProfile = {
      ...MINIMAL_GOOGLE_PROFILE,
      family_name: "Doe",
      given_name: "Jane",
    };
    const result = mapProfile(profileWithNames);
    expect(result.name).toBe("Jane Doe");
  });

  it("handles profile with only given_name", () => {
    const profileWithFirstNameOnly: GoogleProfile = {
      ...MINIMAL_GOOGLE_PROFILE,
      given_name: "Jane",
    };
    const result = mapProfile(profileWithFirstNameOnly);
    expect(result.name).toBe("Jane");
  });

  it("handles profile with only family_name", () => {
    const profileWithLastNameOnly: GoogleProfile = {
      ...MINIMAL_GOOGLE_PROFILE,
      family_name: "Doe",
    };
    const result = mapProfile(profileWithLastNameOnly);
    expect(result.name).toBe("Doe");
  });

  it("handles profile with no names", () => {
    const result = mapProfile(MINIMAL_GOOGLE_PROFILE);
    expect(result.name).toBe("");
  });

  it("always sets id to google provider", () => {
    const result = mapProfile(FULL_GOOGLE_PROFILE);
    expect(result.id).toBe("google");
  });

  it("maps picture to image", () => {
    const result = mapProfile(FULL_GOOGLE_PROFILE);
    expect(result.image).toBe("https://example.com/photo.jpg");
  });
});
