import { Dispatch, SetStateAction } from "react";
import { Root } from "./Input.styles";

type InputProps = {
  value?: string;
  onTextChange: Dispatch<SetStateAction<string>>;
};

export function Input(props: InputProps) {
  const { value, onTextChange } = props;

  return <Root value={value} onChange={(e) => onTextChange(e.target.value)} />;
}
