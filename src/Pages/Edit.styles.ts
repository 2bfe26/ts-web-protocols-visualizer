import { styled } from "@stitches/react";

export const Root = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 25,
  gap: 10,

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: -5,
    color: "#4d4d4d",
  },
});
