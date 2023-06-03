import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Root, Header, Playground, Actions, Content } from "./Play.styles";
import { useAppStore } from "../App.store";
import { V, VParsed, VParsedStep, VParsedHost } from "../App.types";
import { AppHeader, Button, Host, HostAction, ModalRetry } from "../Components";
import { MdArrowBack } from "react-icons/md";
import { Popover } from "../Components/Popover";
import { run_expr, Context } from "../Core/ts-expr-parser";

export function Play() {
  const n = useNavigate();
  const p = useParams() as { id: string };

  const v = useAppStore((state) => state.vs.find((v) => v.id === p.id)) as V;

  const [currentStep, setCurrentStep] = useState<VParsedStep>(
    v.parsed?.passos[v.parsed.primeiroPasso - 1] as VParsedStep
  );
  // @ts-ignore
  const [, setCurrentIndex] = useState(v.parsed?.primeiroPasso - 1);

  const [done, setDone] = useState(true);

  // @ts-ignore
  const host1 = Object.values(v.parsed?.hospedeiros)[0];

  // @ts-ignore
  const host2 = Object.values(v.parsed?.hospedeiros)[1];

  const hostAction = renderHostAction(
    currentStep,
    (v.parsed as VParsed).hospedeiros
  );

  const exprContext: Context = useMemo(
    () => ({
      fns: {
        irPara: (position: number) => {
          setCurrentStep((v.parsed as VParsed).passos[position - 1]);
          setCurrentIndex(position - 1);
        },
        proximo: () => {
          setCurrentIndex((old) => {
            setCurrentStep((v.parsed as VParsed).passos[old + 1]);
            return old + 1;
          });
        },
        fim: () => {
          setDone(true);
        },
      },
    }),
    [setCurrentStep, setCurrentIndex, setDone, v.parsed]
  );

  return (
    <Root>
      <AppHeader
        title="Visualização"
        actions={[
          {
            label: "Voltar",
            Icon: MdArrowBack,
            onClick: () => n(`/${v.id}`),
          },
        ]}
      />

      <Content>
        {done ? <ModalRetry /> : null}
        <Header>
          <div>
            <h2>{v.title}</h2>
            <h3>{v.description}</h3>
          </div>
        </Header>
        <Playground>
          <Popover label={host1} css={{ justifySelf: "flex-end" }}>
            <Host type={host1} />
          </Popover>
          {hostAction}
          <Popover label={host2} css={{ justifySelf: "flex-start" }}>
            <Host type={host2} />
          </Popover>
        </Playground>
        <Actions>
          <span>{currentStep.descricao}</span>
          <div>
            {Object.entries(currentStep.quando).map(([label, expr]) => (
              <Button key={label} onClick={() => run_expr(expr, exprContext)}>
                {label}
              </Button>
            ))}
          </div>
        </Actions>
      </Content>
    </Root>
  );
}

function renderHostAction(currentStep: VParsedStep, hosts: VParsedHost) {
  if ("texto" in currentStep.mostrar) {
    return <HostAction type="Text" value={currentStep.mostrar.texto} />;
  }

  if ("flexa" in currentStep.mostrar) {
    const p0i = Object.keys(hosts).findIndex(
      // @ts-ignore
      (h) => currentStep.mostrar.flexa[0] === h
    );
    const p1i = Object.keys(hosts).findIndex(
      // @ts-ignore
      (h) => currentStep.mostrar.flexa[1] === h
    );

    return (
      <HostAction
        type={p0i > p1i ? "ArrowLeft" : "ArrowRight"}
        value={currentStep.nome}
      />
    );
  }

  return null;
}
