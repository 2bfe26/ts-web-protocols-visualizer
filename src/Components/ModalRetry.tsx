import { MdRestartAlt } from "react-icons/md";
import { Root } from "./ModalRetry.styles";

type ModalRetryProps = {
  onClick?: () => void;
  onClickCancel?: () => void;
};

export function ModalRetry(props: ModalRetryProps) {
  const { onClick, onClickCancel } = props;

  return (
    <Root>
      <button onClick={onClick}>
        <span>Reiniciar visualização?</span>
        <MdRestartAlt size="60px" />
      </button>

      <button onClick={onClickCancel}>Continuar</button>
    </Root>
  );
}
