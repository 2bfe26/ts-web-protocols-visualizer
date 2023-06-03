import { Dispatch, SetStateAction, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Root } from "./YAMLEditor.styles";

export type YAMLEditorProps = {
  value: string;
  onTextChange?: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
};

export function YAMLEditor(props: YAMLEditorProps) {
  const { value, onTextChange, disabled } = props;

  const refTextArea = useRef<HTMLTextAreaElement>(null);

  return (
    <Root
      onClick={() => refTextArea?.current?.focus()}
      style={{
        cursor: disabled ? "initial" : "text",
      }}
    >
      <CodeEditor
        ref={refTextArea}
        value={value}
        language="yaml"
        onChange={(e) => onTextChange?.(e.target.value)}
        disabled={disabled}
        padding={5}
        rows={100}
        style={{
          fontFamily: "sans-serif",
          fontSize: 14,
          background: "transparent",
          minHeight: "100%",
        }}
      />
    </Root>
  );
}
