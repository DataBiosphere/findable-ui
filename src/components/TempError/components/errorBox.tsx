import { JSX } from "react";

interface ErrorBoxProps {
  message: string;
  title: string;
}

/**
 * Error detail with its title.
 * @param props - Component props.
 * @param props.message - Message.
 * @param props.title - Title.
 * @returns The error detail.
 */
export const ErrorBox = ({ message, title }: ErrorBoxProps): JSX.Element => {
  return (
    <div>
      <p>{title}</p>
      <div>{message}</div>
    </div>
  );
};
