import { styled } from "@stitches/react";

export const Root = styled("button", {
  cursor: "pointer",
  padding: 10,
  fontWeight: "bold",
  border: "1px solid #e0e0e0",
  background: "#fff",
  textTransform: "capitalize",

  "&:hover": {
    color: "#fff",
    background: "#000",
  },

  "&:active": {
    opacity: 0.7,
  },

  "&:disabled": {
    opacity: 0.7,
    pointerEvents: "none",
  },
});
