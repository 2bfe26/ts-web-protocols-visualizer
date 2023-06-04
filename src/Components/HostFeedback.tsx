import { Root, Connection } from "./HostFeedback.styles";
import { VParsedHost, VParsedStep } from "../App.types";

export type HostFeedbackProps = {
  hosts?: VParsedHost[];
  stepCurrent: VParsedStep;
};

export function HostFeedback(props: HostFeedbackProps) {
  const { hosts, stepCurrent } = props;

  if ("texto" in stepCurrent.mostrar) {
    return (
      <Root>
        <span>{stepCurrent.mostrar.texto}</span>
      </Root>
    );
  }

  if ("flecha" in stepCurrent.mostrar) {
    // @ts-ignore
    const p0i = hosts.findIndex(
      // @ts-ignore
      (h) => stepCurrent.mostrar.flecha[0] === h.nome
    );
    // @ts-ignore
    const p1i = hosts.findIndex(
      // @ts-ignore
      (h) => stepCurrent.mostrar.flecha[1] === h.nome
    );

    return (
      <Root>
        <span className="conn">{stepCurrent.nome}</span>
        <Connection direction={p0i > p1i ? "left" : "right"} />
      </Root>
    );
  }

  return <Root />;
}
