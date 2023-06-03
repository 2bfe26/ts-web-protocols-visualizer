import { styled, keyframes } from "@stitches/react";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const Root = styled("div", {
  background: "rgba(255, 255, 255, 0.8)",
  zIndex: 99999,
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  animation: `${fadeIn} ease 400ms`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  button: {
    all: "unset",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    marginBottom: 15,

    span: {
      fontSize: 20,
      fontWeight: "bold",
    },

    "&:hover": {
      opacity: 0.6,
    },

    "&:active": {
      opacity: 0.3,
    },
  },
});
