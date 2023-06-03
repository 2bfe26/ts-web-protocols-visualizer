import { styled } from "@stitches/react";

export const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: 15,
  borderRight: "1px solid #e0e0e0",
});

export const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "contain",
    width: 35,
  },

  button: {
    all: "unset",
    cursor: "pointer",

    "&:hover": {
      opacity: 0.6,
    },

    "&:active": {
      opacity: 0.3,
    },
  },
});
