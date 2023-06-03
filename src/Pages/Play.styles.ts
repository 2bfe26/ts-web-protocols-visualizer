import { styled } from "@stitches/react";

export const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 25,
  gap: 10,
  height: "100%",
});

export const Content = styled("div", {
  padding: 25,
  paddingRight: 0,
  height: "100%",
  border: "1px solid #e0e0e0",
  position: "relative",
  background: "white",
  display: "flex",

  ".left": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },

  ".right": {
    width: 140,
    fontSize: 10,
  },
});

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,

  "& div:nth-child(1)": {
    flex: 3,
    display: "flex",
    flexDirection: "column",

    h2: {
      fontSize: 18,
      marginBottom: 5,
    },

    h3: {
      fontSize: 16,
      fontWeight: "normal",
    },
  },

  "& div:nth-child(2)": {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
});

export const Playground = styled("div", {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "1fr 3fr 1fr",
  alignItems: "center",
  alignSelf: "center",
  width: "100%",

  "& div:nth-child(2)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 60px",
  },
});

export const Actions = styled("footer", {
  padding: 25,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  span: {
    fontSize: 18,
    textAlign: "center",
    display: "block",
    marginTop: "auto",
    minHeight: 80,
  },

  div: {
    display: "flex",
    gap: 15,
    marginTop: 25,
  },
});
