import { styled } from "@stitches/react";

export const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 25,
  gap: 10,
});

export const Grid = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: 25,
  alignContent: "flex-start",
});
