import { styled } from "@stitches/react";
import { Link } from "react-router-dom";

export const Root = styled(Link, {
  border: "1px solid #e0e0e0",
  width: 320,
  height: 180,
  backgroundColor: "white",
  display: "flex",
  cursor: "pointer",
  flexDirection: "column",
  padding: 10,
  textDecoration: "none",
  color: "black",

  h2: {
    fontSize: 16,
    wordBreak: "break-word",
  },

  h3: {
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 10,
    wordBreak: "break-word",
  },

  "&.isNew": {
    backgroundColor: "#fcfcfe",
    justifyContent: "center",
    alignItems: "center",
    color: "#8f8d8d",
    fontWeight: "bold",
    transition: "color ease 100ms",
  },

  "&.isInvalid": {
    color: "#f54444 !important",

    "&:hover": {
      borderColor: "#f54444",
    },
  },

  "&:hover": {
    borderColor: "black",
    color: "black",
  },

  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,

    button: {
      all: "unset",
      padding: 5,

      "&:hover": {
        opacity: 0.5,
      },
    },
  },
});
