import { styled, keyframes } from "@stitches/react";

const fadeIn = keyframes({
  "0%": { transform: "translateY(15px)", opacity: 0.4 },
  "100%": { transform: "tranlateY(0)", opacity: 1 },
});

export const Root = styled("div", {
  minWidth: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",

  span: {
    fontSize: 16,
    textAlign: "center",
    animation: `${fadeIn} 1s forwards`,
  },

  "span.conn": {
    position: "absolute",
    bottom: 10,
    fontSize: 12,
    animation: "none",
    fontWeight: "bold",
    maxWidth: "70%",
  },
});

const animConnectionFromLeft = keyframes({
  "0%": {
    backgroundPosition: "212px 0px, 0px 116px, 0px 0px, 216px 116px",
  },
  "100%": {
    backgroundPosition: "0px 0px, 212px 116px, 0px 116px, 216px 0px",
  },
});

const animConnectionFromRight = keyframes({
  "0%": {
    backgroundPosition: "0px 0px, 212px 116px, 0px 116px, 216px 0px",
  },
  "100%": {
    backgroundPosition: "212px 0px, 0px 116px, 0px 0px, 216px 116px",
  },
});

export const Connection = styled("div", {
  width: "80%",
  height: 2,
  color: "#000",
  background: "linear-gradient(90deg, black 50%, transparent 50%)",
  backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
  backgroundSize: "8px 4px, 8px 4px, 4px 8px, 4px 8px",
  position: "relative",

  "&::after": {
    content: "",
    position: "absolute",
    width: 10,
    height: 10,
    top: -5,
    borderRight: "2px solid currentColor",
    borderBottom: "2px solid currentColor",
  },

  variants: {
    direction: {
      left: {
        "&::after": {
          left: -10,
          transform: "rotate(-220deg)",
        },

        alignSelf: "flex-end",
        marginRight: "10%",
        transformOrigin: "right",
        animation: `${animConnectionFromRight} linear 4s infinite reverse`,
      },

      right: {
        "&::after": {
          right: -10,
          transform: "rotate(-45deg)",
        },

        alignSelf: "flex-start",
        marginLeft: "10%",
        transformOrigin: "left",
        animation: `${animConnectionFromLeft} linear 4s infinite reverse`,
      },
    },
  },
});
