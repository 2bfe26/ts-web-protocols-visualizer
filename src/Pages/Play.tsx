import { useMemo, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Canvas, MiniMap, Root } from "./Play.styles";
import { useAppStore } from "../App.store";
import { V, VParsed } from "../App.types";
import {
  AppHeader,
  Button,
  Host,
  HostFeedback,
  ModalRetry,
} from "../Components";
import { MdArrowBack } from "react-icons/md";
import { run_expr, Context } from "../Core/ts-expr-parser";

import reducer, { State } from "./Play.reducer";
import { Popover } from "../Components/Popover";

export function Play() {
  const n = useNavigate();
  const p = useParams() as { id: string };
  const v = useAppStore((state) => state.vs.find((v) => v.id === p.id)) as V;

  const { passos: steps, primeiroPasso: firstStep } = v.parsed as VParsed;

  const [state, dispatch] = useReducer(reducer, {
    stepCurrent: steps[firstStep - 1],
    stepCurrentIndex: firstStep - 1,
    stepPrev: null,
    stack: [steps[firstStep - 1]],
    steps,
    done: false,
  } as State);

  const [modalRetry, setModalRetry] = useState(false);
  const [lastChosenAction, setLastChosenAction] = useState("");

  const context: Context = useMemo(
    () => ({
      vars: {
        "anterior.nome": state.stepPrev?.nome,
        "anterior.acao": lastChosenAction,
      },
      fns: {
        alerta: (...v: any) => {
          alert(v.join(" "));
        },
        proximo: () => dispatch({ type: "NEXT_STEP" }),
        anterior: () => dispatch({ type: "PREV_STEP" }),
        irPara: (p: number) => dispatch({ type: "SET_STEP", payload: p - 1 }),
        fim: () => {
          setModalRetry(true);
          dispatch({ type: "SET_DONE", payload: true });
        },
        when(value: any, cases: any) {
          for (const [k, v] of cases) {
            if (value == k) {
              console.log("call?");
              // @ts-ignore
              v.call();
            }
          }
        },
      },
    }),
    [setModalRetry, state, lastChosenAction]
  );

  if (!state.stepCurrent) {
    return null;
  }

  return (
    <Root>
      <AppHeader
        title={`Visualização - ${v.title}`}
        actions={[
          { label: "Voltar", Icon: MdArrowBack, onClick: () => n(`/${v.id}`) },
        ]}
      />

      <Canvas>
        {state.done && modalRetry && (
          <ModalRetry
            onClick={() =>
              dispatch({
                type: "RESET",
                payload: {
                  stepCurrent: steps[firstStep - 1],
                  stepCurrentIndex: firstStep - 1,
                  stepPrev: null,
                  stack: [steps[firstStep - 1]],
                  steps,
                  done: false,
                },
              })
            }
            onClickCancel={() => setModalRetry(false)}
          />
        )}

        <MiniMap>
          <b style={{ paddingBottom: 10 }}>Pilha de chamadas</b>
          {state.stack.map(({ nome }, i) => (
            <li
              key={i}
              style={{
                fontWeight: i === state.stack.length - 1 ? "bold" : "normal",
              }}
            >
              {nome}
            </li>
          ))}
        </MiniMap>

        <header>
          {state.stepCurrent.etapa ? (
            <>
              <h3>Etapa</h3>
              <h1>{state.stepCurrent.etapa}</h1>
            </>
          ) : null}
        </header>

        <main>
          <section>
            <Popover label={v.parsed?.entidades[0].nome}>
              <Host
                size="80px"
                type={v.parsed?.entidades[0].tipo ?? "cliente"}
              />
            </Popover>
            <HostFeedback
              hosts={v.parsed?.entidades}
              stepCurrent={state.stepCurrent}
            />
            <Popover label={v.parsed?.entidades[1].nome}>
              <Host
                size="80px"
                type={v.parsed?.entidades[1].tipo ?? "cliente"}
              />
            </Popover>
          </section>

          <footer>{state.stepCurrent.descricao}</footer>
        </main>

        <footer>
          {Object.entries(state.stepCurrent["ações"]).map(([label, expr]) => (
            <Button
              key={label}
              onClick={() => {
                setLastChosenAction(label);
                run_expr(expr, context);
              }}
            >
              {label.replaceAll("_", " ")}
            </Button>
          ))}
        </footer>
      </Canvas>
    </Root>
  );
}
