import { JSX } from "react";
import { BUTTON_PROPS } from "../../../common/Button/constants";
import { LoadingIcon } from "../../../common/CustomIcon/components/LoadingIcon/loadingIcon";
import { StyledButton } from "./buttons.styles";
import { Props } from "./types";

/**
 * Renders a sign-in button per provider. While a login is in flight every
 * button is disabled and the requesting provider's button shows a loading icon.
 * @param props - Component props (extends MUI ButtonProps).
 * @param props.className - Class name applied to each button.
 * @param props.disabled - When true, disables the buttons regardless of in-flight state.
 * @param props.endIcon - Icon at the end of each button when not loading; falls back to the provider's icon.
 * @param props.handleLogin - Callback invoked with the selected provider id.
 * @param props.providers - Auth providers to render a button for.
 * @param props.submittingProviderId - The provider id whose login is in flight, or null.
 * @returns A button element for each provider.
 */
export const Buttons = ({
  className,
  disabled,
  endIcon,
  handleLogin,
  providers = [],
  submittingProviderId = null,
  ...props /* Mui ButtonProps */
}: Props): JSX.Element[] => {
  return providers?.map((provider) => {
    const isSubmitting = submittingProviderId === provider.id;
    return (
      <StyledButton
        key={provider.id}
        className={className}
        {...BUTTON_PROPS.SECONDARY_CONTAINED}
        {...props}
        // Component-controlled props are set after the spread so a consumer
        // cannot override the login wiring; `disabled`/`endIcon` are destructured
        // out of `props` above and combined with the in-flight state here.
        disabled={submittingProviderId !== null || disabled}
        endIcon={
          isSubmitting ? (
            <LoadingIcon fontSize="small" />
          ) : (
            (endIcon ?? provider.icon)
          )
        }
        fullWidth
        onClick={() => handleLogin(provider.id)}
      >
        {provider.name}
      </StyledButton>
    );
  });
};
