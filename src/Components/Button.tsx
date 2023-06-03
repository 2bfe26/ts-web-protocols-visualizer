import { HTMLProps } from "react";
import { Root } from "./Button.styles";

type ButtonProps = HTMLProps<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { children, onClick, disabled } = props;

  return (
    <Root disabled={disabled} onClick={onClick}>
      {children}
    </Root>
  );
}
