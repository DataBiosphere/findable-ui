import { Slide as MSlide, SlideProps as MSlideProps } from "@mui/material";
import { JSX, forwardRef } from "react";

export const Slide = forwardRef<Element, MSlideProps>(function Slide(
  {
    children,
    ...props /* Spread props to allow for Mui SlideProps specific prop overrides. */
  }: MSlideProps,
  ref,
): JSX.Element {
  return (
    <MSlide
      direction="left"
      easing="ease-out"
      ref={ref}
      unmountOnExit
      {...props}
    >
      {children}
    </MSlide>
  );
});
