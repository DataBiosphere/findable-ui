export interface DataDictionaryContextProps {
  // Dictionary key; used to identify the dictionary currently rendered.
  // Propagates the dictionary key to child components via context without
  // having to pass it explicitly with props.
  dictionary: string;
}
