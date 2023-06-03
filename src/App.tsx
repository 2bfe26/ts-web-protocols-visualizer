import { HashRouter as Router } from "react-router-dom";
import { globalCss } from "@stitches/react";
import { AppRoutes } from "./App.routes";

const globalStyles = globalCss({
  "*": {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    fontFamily: "sans-serif",
  },

  "html, body, #root": {
    height: "100%",
  },
});

export function App() {
  globalStyles();

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
