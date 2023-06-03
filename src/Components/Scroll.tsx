import { PropsWithChildren } from "react";
import { Root, Content } from "./Scroll.styles";
import { CSS } from "@stitches/react";

type ScrollProps = PropsWithChildren<{
  css?: CSS;
}>;

export function Scroll(props: ScrollProps) {
  const { children, css = {} } = props;

  return (
    <Root css={css}>
      <Content>{children}</Content>
    </Root>
  );
}
