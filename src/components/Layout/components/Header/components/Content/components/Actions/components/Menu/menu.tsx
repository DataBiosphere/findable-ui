import { MenuRounded } from "@mui/icons-material";
import { Fade, IconButton, Dialog as MDialog } from "@mui/material";
import {
  CSSProperties,
  forwardRef,
  Fragment,
  JSX,
  useEffect,
  useId,
} from "react";
import {
  getPopupAriaProps,
  HAS_POPUP,
} from "../../../../../../../../../../utils/ariaPopup";
import { applySlotId } from "../../../../../../../../../../utils/slotProps";
import { getMenuNavigationLinks } from "../../../../../../common/utils";
import { HeaderProps } from "../../../../../../header";
import { AppBar } from "../../../../../../header.styles";
import { Content } from "../../../../content.styles";
import { Slogan } from "../../../Slogan/slogan";
import {
  ARIA_LABEL,
  DIALOG_PAPER_PROPS,
  DIALOG_PROPS,
} from "./common/constants";
import { Navigation } from "./components/Content/components/Navigation/navigation.styles";
import { Socials } from "./components/Content/components/Socials/socials.styles";
import { Toolbar } from "./components/Toolbar/toolbar";

/**
 * Props for the Menu component.
 */
export interface MenuProps {
  closeMenu: () => void;
  headerProps: HeaderProps;
  isMenuIn: boolean;
  open: boolean;
  openMenu: () => void;
  pathname?: string;
  style?: CSSProperties; // Required for Fade component. See https://mui.com/material-ui/transitions/#child-requirement.
}

/**
 * Header menu: a menu button that opens a full-screen dialog with the toolbar, slogan, navigation links and socials.
 * Closes the menu when the header expands again.
 * @param props - Component props.
 * @param props.closeMenu - Function invoked to close the menu.
 * @param props.headerProps - Header props, providing the navigation, slogan, social media and toolbar props.
 * @param props.isMenuIn - Whether the header is collapsed to a menu.
 * @param props.open - Whether the menu dialog is open.
 * @param props.openMenu - Function invoked to open the menu.
 * @param props.pathname - Current pathname, used to mark the selected navigation link.
 * @param props.style - Style applied to the menu button; required for the Fade transition.
 * @param ref - Ref forwarded to the menu button element.
 * @returns The header menu, or null when the header is not collapsed to a menu.
 */
export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  function HeaderMenu(
    {
      closeMenu,
      headerProps,
      isMenuIn,
      open,
      openMenu,
      pathname,
      style,
    }: MenuProps,
    ref,
  ): JSX.Element | null {
    const { navigation, slogan, socialMedia } = headerProps;
    const dialogId = useId();

    // Set drawer open state to false on change of media breakpoint from small desktop "md" and up.
    useEffect(() => {
      if (isMenuIn) return;
      closeMenu();
    }, [closeMenu, isMenuIn]);

    if (!isMenuIn) return null;

    return (
      <Fragment>
        <IconButton
          {...getPopupAriaProps({
            hasPopup: HAS_POPUP.DIALOG,
            id: dialogId,
            open,
          })}
          aria-label={ARIA_LABEL.OPEN_MENU}
          color="ink"
          onClick={openMenu}
          ref={ref}
          style={style}
        >
          <MenuRounded />
        </IconButton>
        <MDialog
          {...DIALOG_PROPS}
          onClose={closeMenu}
          open={open}
          slotProps={{ paper: applySlotId(dialogId, DIALOG_PAPER_PROPS) }}
          TransitionComponent={Fade}
        >
          <AppBar component="div" elevation={0}>
            <Toolbar onClose={closeMenu} {...headerProps} />
          </AppBar>
          <Content>
            {slogan && <Slogan slogan={slogan} />}
            <Navigation
              closeAncestor={closeMenu}
              headerProps={headerProps}
              isMenuIn={isMenuIn}
              links={getMenuNavigationLinks(navigation)}
              pathname={pathname}
            />
            {socialMedia && (
              <Socials buttonSize="xlarge" socials={socialMedia.socials} />
            )}
          </Content>
        </MDialog>
      </Fragment>
    );
  },
);
