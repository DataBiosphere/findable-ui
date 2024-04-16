import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { CodeBlock } from "./code.styles";

export interface CodeProps {
  className?: string;
  code: string;
}

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
      return () => clearTimeout(copiedTimeout);
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
