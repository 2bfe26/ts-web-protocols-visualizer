import { styled } from "@stitches/react";

export const Root = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: 40,

  h1: {
    fontSize: 18,
  },

  div: {
    display: "flex",
    gap: 10,

    button: {
      all: "unset",
      cursor: "pointer",
      opacity: 1,
      padding: 5,

      "&:hover": {
        opacity: 0.4,
      },

      "&:active": {
        opacity: 0.2,
      },

      "&:disabled": {
        opacity: 0.4,
        pointerEvents: "none",
      },
    },
  },
});
