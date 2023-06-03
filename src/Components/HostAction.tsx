import { CSS } from "@stitches/react";
import { Root, Arrow, Text } from "./HostAction.styles";

export type HostActionProps = {
  type: "ArrowLeft" | "ArrowRight" | "Text";
  value?: any;
  css?: CSS;
};

export function HostAction(props: HostActionProps) {
  const { type, value } = props;

  if (type === "Text") {
    return (
      <Root>
        <Text>{value}</Text>
      </Root>
    );
  }

  if (type === "ArrowLeft") {
    return (
      <Root>
        <span style={{ fontWeight: "bold", marginLeft: 10, marginBottom: 20 }}>
          {value}
        </span>
        <Arrow position="left" />
      </Root>
    );
  }

  if (type === "ArrowRight") {
    return (
      <Root>
        <span style={{ fontWeight: "bold", marginRight: 10, marginBottom: 20 }}>
          {value}
        </span>
        <Arrow position="right" />
      </Root>
    );
  }

  return <Root />;
}
