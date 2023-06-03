import { MdEdit, MdDelete } from "react-icons/md";
import { Root } from "./Card.styles";
import { Popover } from "./Popover";

type CardProps = {
  to: string;
  content?: {
    title: string;
    description: string;
  };
  isInvalid?: boolean;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
};

export function Card(props: CardProps) {
  const { to, content, isInvalid, onClickEdit, onClickDelete } = props;

  if (!content) {
    return (
      <Root to={to} className="isNew">
        Criar nova visualização
      </Root>
    );
  }

  return (
    <Root to={to} className={isInvalid ? "isInvalid" : ""}>
      <h2>{content.title}</h2>
      <h3>{content.description}</h3>

      <footer>
        <Popover label="Editar">
          <button
            onClick={(e) => {
              e.preventDefault();
              onClickEdit?.();
            }}
          >
            <MdEdit />
          </button>
        </Popover>
        <Popover label="Deletar">
          <button
            onClick={(e) => {
              e.preventDefault();
              onClickDelete?.();
            }}
          >
            <MdDelete />
          </button>
        </Popover>
      </footer>
    </Root>
  );
}
