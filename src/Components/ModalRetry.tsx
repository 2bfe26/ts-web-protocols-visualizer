import { MdRestartAlt } from "react-icons/md";
import { Root } from "./ModalRetry.styles";

export function ModalRetry() {
  return (
    <Root>
      <span>Reiniciar visualização?</span>
      <MdRestartAlt size="60px" />
    </Root>
  );
}
