import { CSS } from "@stitches/react";
import { Root } from "./Host.styles";
import { GoBrowser, GoServer } from "react-icons/go";

export type HostProps = {
  type: keyof typeof Icons;
  css?: CSS;
  size?: string;
};

export function Host(props: HostProps) {
  const { type, size = "64px", css = {} } = props;

  const Icon = Icons[type];

  return (
    <Root css={css}>
      <Icon size={size} />
    </Root>
  );
}

const Icons = {
  navegador: GoBrowser,
  cliente: GoBrowser,
  servidor: GoServer,
};
