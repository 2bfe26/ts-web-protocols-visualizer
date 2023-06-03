import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Root } from "./Show.styles";
import { YAMLEditor, Scroll, AppHeader } from "../Components";
import { V } from "../App.types";
import { useAppStore } from "../App.store";
import { MdArrowBack, MdDelete, MdEdit, MdPlayArrow } from "react-icons/md";

export function Show() {
  const n = useNavigate();
  const p = useParams() as { id: string };

  const v = useAppStore((state) => state.vs.find((v) => v.id === p.id)) as V;
  const rmV = useAppStore((state) => state.rmV);

  if (!v) {
    return <Navigate to="/" />;
  }

  return (
    <Root>
      <AppHeader
        title={v.title}
        actions={[
          {
            label: "Iníciar",
            Icon: MdPlayArrow,
            onClick: () => n(`/${v.id}/iniciar`),
            disabled: !v.parsed,
          },
          {
            label: "Deletar",
            Icon: MdDelete,
            onClick: () => rmV(v.id),
          },
          {
            label: "Editar",
            Icon: MdEdit,
            onClick: () => n(`/${v.id}/editar`),
          },
          {
            label: "Voltar",
            Icon: MdArrowBack,
            onClick: () => n("/"),
          },
        ]}
      />

      <Scroll
        css={{
          border: v.parsed ? "1px solid #e0e0e0" : "1px solid red",
          background: "#fcfcfe",
        }}
      >
        <YAMLEditor value={v.src} disabled />
      </Scroll>
    </Root>
  );
}
