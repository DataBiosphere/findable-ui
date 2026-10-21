// Stable class name stamped on the data dictionary filters grid, so the filters
// layout can target it without `:first-child`, which Emotion's server render
// makes unreliable (inline <style> elements precede the grid).
export const FILTERS_CLASS_NAME = "data-dictionary-filters";
