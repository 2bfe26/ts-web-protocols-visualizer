import { styled } from "@stitches/react";

export const Root = styled("div", {
  display: "grid",
  gridTemplateColumns: "55px 1fr",
  height: "100%",
  overflow: "hidden",
});

export const Content = styled("div", {
  backgroundColor: "#fcfcfe",
  backgroundImage: "url(background-pattern-2.png)",
  backgroundSize: "70px, auto",
  height: "100%",
});
