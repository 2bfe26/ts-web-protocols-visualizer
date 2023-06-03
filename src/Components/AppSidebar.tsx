import { useNavigate } from "react-router-dom";
import { Root, Header } from "./AppSidebar.styles";

export function AppSidebar() {
  const n = useNavigate();

  return (
    <Root>
      <Header>
        <button onClick={() => n("/")}>
          <img src="./ufsc.png" />
        </button>
      </Header>
    </Root>
  );
}
