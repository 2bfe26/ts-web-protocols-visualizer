import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Root } from "./New.styles";
import { YAMLEditor, Input, Scroll, AppHeader } from "../Components";
import { useAppStore } from "../App.store";
import { nanoid as uuid } from "nanoid";
import { MdArrowBack, MdSave } from "react-icons/md";

export function New() {
  const n = useNavigate();
  const addV = useAppStore((state) => state.addV);

  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Root>
      <AppHeader
        title="Novo"
        actions={[
          {
            label: "Salvar",
            Icon: MdSave,
            onClick: () => {
              addV({ id: uuid(), src, title, description });
              n("/");
            },
          },
          {
            label: "Voltar",
            Icon: MdArrowBack,
            onClick: () => n("/"),
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
