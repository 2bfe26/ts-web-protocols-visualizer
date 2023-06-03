import { useAppStore } from "../App.store";
import { Root, Grid } from "./Start.styles";
import { AppHeader, Card } from "../Components";
import { useNavigate } from "react-router-dom";

export function Start() {
  const n = useNavigate();
  const vs = useAppStore((state) => state.vs);
  const rmV = useAppStore((state) => state.rmV);

  return (
    <Root>
      <AppHeader title="Visualizações" />

      <Grid>
        {vs.map(({ id, title, description, parsed }) => (
          <Card
            to={`/${id}`}
            isInvalid={!parsed}
            key={id}
            content={{ title, description }}
            onClickEdit={() => n(`/${id}/editar`)}
            onClickDelete={() => rmV(id)}
          />
        ))}

        <Card to="/novo" />
      </Grid>
    </Root>
  );
}
