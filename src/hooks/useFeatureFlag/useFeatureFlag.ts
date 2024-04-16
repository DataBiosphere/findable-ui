import { useEffect, useState } from "react";
import { getLocalStorage } from "../useLocalStorage/common/utils";
import { FLAG } from "./common/entities";

/**
 * Determine if feature is available to user.
 * @param featureFlag - Name of feature.
 * @returns true if feature is available to user.
 */
export function useFeatureFlag(featureFlag: string): boolean {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  // Sets state of enabled flag.
  useEffect(() => {
    setIsEnabled(getLocalStorage(featureFlag) === FLAG.TRUE);
  }, [featureFlag]);

  return isEnabled;
}
