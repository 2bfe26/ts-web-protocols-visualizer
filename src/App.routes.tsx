import { Routes, Route } from "react-router-dom";

import * as Layouts from "./Layouts";
import * as Pages from "./Pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layouts.App />}>
        <Route index element={<Pages.Start />} />
        <Route path="/novo" element={<Pages.New />} />
        <Route path="/:id/iniciar" element={<Pages.Play />} />
        <Route path="/:id/editar" element={<Pages.Edit />} />
        <Route path="/:id" element={<Pages.Show />} />
      </Route>
    </Routes>
  );
}
