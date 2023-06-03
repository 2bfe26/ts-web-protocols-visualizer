import { styled } from "@stitches/react";

export const Root = styled("div", {
  height: "100%",
  maxHeight: "100%",
  width: "100%",
  position: "relative",
  overflow: "auto",
});

export const Content = styled("div", {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  maxHeight: "100%",
  height: "100%",
});
