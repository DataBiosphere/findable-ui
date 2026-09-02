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

      // Classified before closing: the close unmounts the uncontrolled form, so
      // bailing out afterwards would discard the term with nothing to show for it.
      const clientSide = isClientSideNavigation(searchURL);

      if (!clientSide && !isValidUrl(searchURL)) {
        // A misconfigured searchURL is a build-time mistake, but throwing here
        // would escape the submit handler to the nearest error boundary and take
        // the page down. Report it and leave the user where they are.
        console.error(`Invalid search URL: ${searchURL}.`);
        return;
      }

      closeMenu();
      onClose();

      if (clientSide) {
        Router.push({
          pathname: searchURL,
          search: getSearchParams(searchParams, searchTerm).toString(),
        });
        return;
      }

      // Build search URL and redirect to it.
      const location = new URL(searchURL);
      location.search = getSearchParams(searchParams, searchTerm).toString();
      window.location.href = location.href;
    },
    [closeMenu, onClose, searchParams, searchURL],
  );

  return { onSubmit };
};
