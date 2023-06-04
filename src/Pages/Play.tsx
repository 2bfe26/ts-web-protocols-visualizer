import { useCallback, useEffect, useMemo, useState } from "react";
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

  const [stack, setStack] = useState<string[]>([]);
  const createStackEntry = useCallback(
    (step: VParsedStep): string => {
      if ("flecha" in step.mostrar) {
        const dir = getArrowDirection(step, v.parsed?.entidades as any);

        return dir === "ArrowLeft" ? `< ${step.nome}` : `> ${step.nome}`;
      }

      return step.nome;
    },
    [v.parsed]
  );

  const [currentStep, setCurrentStep] = useState<VParsedStep>(() => {
    return v.parsed?.passos[v.parsed.primeiroPasso - 1] as VParsedStep;
  });
  // @ts-ignore
  const [, setCurrentIndex] = useState(v.parsed?.primeiroPasso - 1);

  const [done, setDone] = useState(false);
  const [modalRetry, setModalRetry] = useState(false);

  const host1 = v.parsed?.entidades[0] as VParsedHost;

  const host2 = v.parsed?.entidades[1] as VParsedHost;

  const hostAction = renderHostAction(
    currentStep,
    (v.parsed as VParsed).entidades
  );

  const exprContext: Context = useMemo(
    () => ({
      fns: {
        irPara: (position: number) => {
          const step = (v.parsed as VParsed).passos[position - 1];

          setCurrentStep(step);
        },
        proximo: () => {
          const currentIndex = v.parsed?.passos.findIndex(
            (i) => JSON.stringify(i) === JSON.stringify(currentStep)
          );
          // @ts-ignore
          const step = (v.parsed as VParsed).passos[currentIndex + 1];

          setCurrentStep(step);
        },
        fim: () => {
          if (!done) {
            setDone(true);
          }

          setModalRetry(true);
        },
      },
    }),
    [currentStep, setCurrentStep, setModalRetry, v.parsed, done]
  );

  useEffect(() => {
    setStack((i) => [...i, createStackEntry(currentStep)]);
  }, [currentStep, createStackEntry]);

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
        {done && modalRetry ? (
          <ModalRetry
            onClick={() => {
              setCurrentStep(
                v.parsed?.passos[v.parsed.primeiroPasso - 1] as VParsedStep
              );
              setCurrentIndex(0);
              setDone(false);
              setStack([]);
            }}
            onClickCancel={() => setModalRetry(false)}
          />
        ) : null}
        <div className="left">
          <Header>
            <div>
              <h2>{v.title}</h2>
              <h3>{currentStep.etapa}</h3>
            </div>
          </Header>
          <Playground>
            <Popover label={host1.nome} css={{ justifySelf: "flex-end" }}>
              <Host type={host1.tipo} />
            </Popover>
            {hostAction}
            <Popover label={host2.nome} css={{ justifySelf: "flex-start" }}>
              <Host type={host2.tipo} />
            </Popover>
          </Playground>
          <Actions>
            <span>{currentStep.descricao}</span>
            <div>
              {Object.entries(currentStep.ações).map(([label, expr]) => (
                <Button key={label} onClick={() => run_expr(expr, exprContext)}>
                  {label}
                </Button>
              ))}
            </div>
          </Actions>
        </div>
        <div className="right">
          <span
            style={{
              marginLeft: -15,
              marginBottom: 5,
              fontWeight: "bold",
              display: "block",
            }}
          >
            Pilha de execução
          </span>
          <ol>
            {stack.map((nome, i) => (
              <li key={i}>{nome}</li>
            ))}
          </ol>
        </div>
      </Content>
    </Root>
  );
}

function getArrowDirection(currentStep: VParsedStep, hosts: VParsedHost[]) {
  const p0i = hosts.findIndex(
    // @ts-ignore
    (h) => currentStep.mostrar.flecha[0] === h.nome
  );
  const p1i = hosts.findIndex(
    // @ts-ignore
    (h) => currentStep.mostrar.flecha[1] === h.nome
  );

  return p0i > p1i ? "ArrowLeft" : "ArrowRight";
}

function renderHostAction(currentStep: VParsedStep, hosts: VParsedHost[]) {
  if ("texto" in currentStep.mostrar) {
    return <HostAction type="Text" value={currentStep.mostrar.texto} />;
  }

  if ("flecha" in currentStep.mostrar) {
    return (
      <HostAction
        type={getArrowDirection(currentStep, hosts)}
        value={currentStep.nome}
      />
    );
  }

  return null;
}
