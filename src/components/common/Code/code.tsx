import copy from "copy-to-clipboard";
import { JSX, useEffect, useState } from "react";
import { CodeBlock } from "./code.styles";

/**
 * Props for the Code component.
 */
export interface CodeProps {
  className?: string;
  code: string;
}

/**
 * Renders a code block that copies its code to the clipboard on click, showing a copied state for 2 seconds.
 * @param props - Component props.
 * @param props.className - Class name applied to the code block.
 * @param props.code - Code to display and copy.
 * @returns The code block.
 */
export const Code = ({ className, code }: CodeProps): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);

  // Copies code to clipboard and sets copied state to true.
  const onCopyCode = (str: string): void => {
    copy(str);
    setCopied(true);
  };

  // Copied state set to false after a specified time (2 seconds).
  useEffect(() => {
    if (copied) {
      const copiedTimeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return (): void => clearTimeout(copiedTimeout);
    }
  }, [copied]);

  return (
    <CodeBlock
      className={className}
      copied={copied}
      onClick={(): void => onCopyCode(code)}
    >
      <code>{code}</code>
    </CodeBlock>
  );
};
