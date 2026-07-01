// Stable class name stamped on the assistant message's markdown renderer so
// consuming apps can target and override its styles. The defaults are emitted
// at single-class specificity (e.g. `.css-hash h1`), so an override must be at
// least as specific AND win the cascade. Prefer a doubled class to be safe:
// `.assistant-message-markdown.assistant-message-markdown h1 { ... }` (or `&&`
// with MUI/emotion). A single `.assistant-message-markdown h1` ties on
// specificity and only wins on stylesheet insertion order, which is unreliable.
export const MARKDOWN_CLASS_NAME = "assistant-message-markdown";
