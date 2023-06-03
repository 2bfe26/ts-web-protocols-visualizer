import { useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Root } from "./Edit.styles";
import { YAMLEditor, Input, Scroll, AppHeader } from "../Components";
import { V } from "../App.types";
import { useAppStore } from "../App.store";
import { MdArrowBack, MdSave } from "react-icons/md";

export function Edit() {
  const n = useNavigate();
  const p = useParams() as { id: string };

  const v = useAppStore((state) => state.vs.find((v) => v.id === p.id)) as V;
  const setV = useAppStore((state) => state.setV);

  const [src, setSrc] = useState(v?.src);
  const [title, setTitle] = useState(v?.title);
  const [description, setDescription] = useState(v?.description);

  if (!v) {
    return <Navigate to="/" />;
  }

  return (
    <Root>
      <AppHeader
        title="Editar"
        actions={[
          {
            label: "Salvar",
            Icon: MdSave,
            onClick: () => {
              setV({ ...v, src, title, description });
              n(`/${v.id}`);
            },
          },
          {
            label: "Voltar",
            Icon: MdArrowBack,
            onClick: () => n(`/${v.id}`),
          },
        ]}
      />

      <label>Título</label>
      <Input value={title} onTextChange={setTitle} />

      <label>Descrição</label>
      <Input value={description} onTextChange={setDescription} />

      <label>Código</label>
      <Scroll css={{ border: "1px solid #e0e0e0", background: "white" }}>
        <YAMLEditor value={src} onTextChange={setSrc} />
      </Scroll>
    </Root>
  );
}
