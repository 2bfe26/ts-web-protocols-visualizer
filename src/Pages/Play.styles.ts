import { styled } from "@stitches/react";

export const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 25,
  gap: 10,
  height: "100%",
});

export const Canvas = styled("section", {
  position: "relative",
  height: "100%",
  background: "white",
  border: "1px solid #e0e0e0",
  padding: 20,

  display: "flex",
  flexDirection: "column",

  header: {
    h1: { fontSize: 24 },
    h3: { fontSize: 14, fontWeight: "normal" },
  },

  main: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    section: {
      flex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -140,
    },

    footer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      fontSize: 14,
      textAlign: "center",
      fontWeight: "lighter",
      maxWidth: 600,
    },
  },

  "> footer": {
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  },
});

export const MiniMap = styled("ol", {
  position: "absolute",
  top: 10,
  right: 10,
  width: 300,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  pointerEvents: "none",
  padding: 10,
  fontSize: 10,
  color: "rgba(0, 0, 0, 0.7)",
  gap: 5,
  listStyle: "none",
  li: {
    textAlign: "right",
  },
});
