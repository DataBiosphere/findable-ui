import { Slide as MSlide, SlideProps as MSlideProps } from "@mui/material";
import { JSX, forwardRef } from "react";

export const DrawerTransition = forwardRef<Element, MSlideProps>(
  function DrawerTransition(
    {
      children,
      ...props /* Spread props to allow for Mui SlideProps specific prop overrides. */
    }: MSlideProps,
    ref,
  ): JSX.Element {
    return (
      <MSlide
        direction="right"
        easing="ease-out"
        ref={ref}
        unmountOnExit
        {...props}
      >
        {children}
      </MSlide>
    );
  },
);
