import { useRouter } from "next/router";
import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { useFigureLightbox } from "../../../../provider/hook";
import type { LightboxFigureItem } from "../../../../types";
import { resolveFigureSrc } from "../../../../utils";
import { UseRegisterFigure, UseRegisterFigureProps } from "./types";

/**
 * Registers a figure with the nearest FigureLightboxProvider for as long as it is mounted, and returns the handler that opens the lightbox at it.
 * Root-relative image URLs are resolved against the app's base path, as StaticImage resolves them; absolute URLs are used as is.
 * @param props - Hook props.
 * @param props.alt - Image alt text.
 * @param props.caption - Caption content.
 * @param props.originalSrc - Root-relative path to the original file; defaults to src.
 * @param props.src - Root-relative path to the image, or an image data URL.
 * @returns The actions (the open handler) and the figure ref.
 */
export function useRegisterFigure({
  alt,
  caption,
  originalSrc,
  src,
}: UseRegisterFigureProps): UseRegisterFigure {
  const context = useFigureLightbox();
  const { basePath } = useRouter();
  const figureRef = useRef<HTMLElement>(null);
  const id = useId();

  const figure = useMemo((): LightboxFigureItem => {
    const imageSrc = resolveFigureSrc(basePath, src ?? "");
    return {
      alt,
      caption,
      figureRef,
      id,
      originalSrc: originalSrc
        ? resolveFigureSrc(basePath, originalSrc)
        : imageSrc,
      src: imageSrc,
    };
  }, [alt, basePath, caption, id, originalSrc, src]);

  // Updated in place when its props change (a JSX caption changes on every parent
  // render), and removed only when it unmounts, so it keeps its place in the group.
  const register = context?.actions.register;
  const unregister = context?.actions.unregister;
  useEffect(() => register?.(figure), [figure, register]);
  useEffect(() => (): void => unregister?.(id), [id, unregister]);

  // The latest figure, for the load listener below, which shouldn't be
  // re-attached each time a JSX caption changes.
  const latestFigureRef = useRef(figure);
  useEffect(() => {
    latestFigureRef.current = figure;
  }, [figure]);

  // Slide sizes come from the inline image's natural size. If the image hasn't
  // loaded yet, the figure is registered again once it has, so a lightbox opened
  // in the meantime rebuilds its slide with the size.
  useEffect(() => {
    const image = figureRef.current?.querySelector("img");
    if (!image || image.naturalWidth || !register) return;
    const onLoad = (): void => register({ ...latestFigureRef.current });
    image.addEventListener("load", onLoad, { once: true });
    return (): void => image.removeEventListener("load", onLoad);
  }, [register, src]);

  const openLightbox = context?.actions.onOpen;
  const onOpen = useCallback(
    (): void => openLightbox?.(id),
    [id, openLightbox],
  );

  return { actions: { onOpen }, figureRef };
}
