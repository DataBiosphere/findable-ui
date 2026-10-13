import { Slide as MSlide, SlideProps as MSlideProps } from "@mui/material";
import { JSX, forwardRef } from "react";

/**
 * Slide transition for the navigation drawer, sliding in from the right with ease-out easing and unmounting its children on exit.
 * @param props - Mui slide props.
 * @param props.children - Content to transition.
 * @param ref - Ref forwarded to the slide transition.
 * @returns The slide transition.
 */
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
