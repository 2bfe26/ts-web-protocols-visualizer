import { styled, keyframes } from "@stitches/react";

const scaleUpLeft = keyframes({
  "0%": { transform: "scaleX(1) translateX(0)" },
  "100%": { transform: "scaleX(1.7) translateX(20%)" },
});

const scaleUpRight = keyframes({
  "0%": { transform: "scaleX(1) translateX(0)" },
  "100%": { transform: "scaleX(1.7) translateX(-20%)" },
});

const fadeIn = keyframes({
  "0%": { transform: "translateY(15px)", opacity: 0.4 },
  "100%": { transform: "tranlateY(0)", opacity: 1 },
});

export const Root = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const Text = styled("span", {
  fontSize: 18,
  textAlign: "center",
  animation: `${fadeIn} 1s forwards`,
});

export const Arrow = styled("div", {
  width: "50%",
  height: 2,
  color: "#000",
  background: "currentColor",
  position: "relative",

  variants: {
    position: {
      left: {
        animation: `${scaleUpLeft} 1s forwards`,
        transformOrigin: "right",

        "&::before": {
          content: "",
          position: "absolute",
          top: -6,
          left: 0,
          width: 12,
          height: 12,
          borderLeft: "2px solid currentColor",
          borderBottom: "2px solid currentColor",
          transform: "rotate(45deg)",
        },
      },
      right: {
        animation: `${scaleUpRight} 1s forwards`,
        transformOrigin: "left",

        "&::after": {
          content: "",
          position: "absolute",
          top: -6,
          right: 0,
          width: 12,
          height: 12,
          borderRight: "2px solid currentColor",
          borderBottom: "2px solid currentColor",
          transform: "rotate(-45deg)",
        },
      },
    },
  },
});
