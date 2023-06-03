import { CSS } from "@stitches/react";
import { Root } from "./Popover.styles";

type PopoverProps = {
  label?: string | null;
  children?: any;
  css?: CSS;
};

export function Popover(props: PopoverProps) {
  const { children, label, css } = props;

  if (!label) return children;

  return (
    <Root css={{ "&::after": { content: label }, ...css }}>{children}</Root>
  );
}
