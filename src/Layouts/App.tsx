import { Outlet } from "react-router-dom";

import { AppSidebar } from "../Components";
import { Root, Content } from "./App.styles";

export function App() {
  return (
    <Root>
      <AppSidebar />
      <Content>
        <Outlet />
      </Content>
    </Root>
  );
}
