import { styled } from "@stitches/react";

export const Root = styled("div", {
  position: "relative",
  textTransform: "capitalize",

  "&::after": {
    position: "absolute",
    left: 0,
    bottom: -4,
    display: "flex",
    justifyContent: "center",
    minWidth: "100%",
    width: "fit-content",
    height: "fit-content",
    margin: "auto",
    fontSize: 9,
    fontWeight: "bold",
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    padding: 3,
    borderRadius: 3,
    opacity: 0,
    transition: "all ease 200ms",
    userSelect: "none",
  },

  "&:hover::after": {
    opacity: 1,
    bottom: -12,
  },
});
