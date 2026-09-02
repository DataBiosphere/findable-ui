import { useSearchParams } from "next/navigation";
import Router from "next/router";
import { FormEvent, useCallback } from "react";
import { isValidUrl } from "../../../../../../../../../../../../common/utils";
import { isClientSideNavigation } from "../../../../../../../../../../../Links/common/utils";
import { UseSubmitProps, UseSubmitReturn } from "./types";
import { getSearchParams } from "./utils";

/**
 * Hook that manages search submission and navigation.
 * Closes the menu and the search bar, then navigates to the configured search
 * URL — client side where possible, otherwise a full page redirect.
 * @param props - Hook props.
 * @param props.closeMenu - Closes the header menu.
 * @param props.onClose - Closes the search bar.
 * @param props.searchURL - Configured search path.
 * @returns Object containing the onSubmit handler.
 */
export const useSubmit = ({
  closeMenu,
  onClose,
  searchURL,
}: UseSubmitProps): UseSubmitReturn => {
  const searchParams = useSearchParams();

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>, searchTerm: string): void => {
      e.preventDefault();

      if (!searchTerm || !searchURL) return;

      closeMenu();
      onClose();

      if (isClientSideNavigation(searchURL)) {
        Router.push({
          pathname: searchURL,
          search: getSearchParams(searchParams, searchTerm).toString(),
        });
        return;
      }

      if (isValidUrl(searchURL)) {
        // Build search URL and redirect to it.
        const location = new URL(searchURL);
        location.search = getSearchParams(searchParams, searchTerm).toString();
        window.location.href = location.href;
        return;
      }

      throw new Error("Invalid search URL.");
    },
    [closeMenu, onClose, searchParams, searchURL],
  );

  return { onSubmit };
};
