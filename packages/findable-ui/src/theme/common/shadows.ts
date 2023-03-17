/*
 * Elevation
 */
enum ELEVATION {
  E00 = "none",
  E01 = "0 1px 4px 0 #00000012",
  E02 = "0 8px 8px -4px #10182808, 0 20px 24px -4px #10182814",
}

/**
 * Stroke
 */
enum STROKE {
  BOTTOM = "inset 0 -1px 0 0",
  TOP = "inset 0 1px 0 0",
}

/**
 * Elevation constants
 */
export const elevation00 = ELEVATION.E00;
export const elevation01 = ELEVATION.E01;
export const elevation02 = ELEVATION.E02;

/**
 * Shadows constants
 */
export const shadows = [elevation00, elevation01, elevation02];

/**
 * Stroke constants
 */
export const strokeBottom = STROKE.BOTTOM;
export const strokeTop = STROKE.TOP;
