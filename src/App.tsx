import { Stack } from "@mui/material";
import { AppRouterView } from "./router";
import { HashRouter, Link } from "react-router-dom";

export const App = () => {
  return (
    <HashRouter>
      <Stack className="relative w-screen h-screen overflow-hidden bg-gray-100">
        <Stack
          gap=".5rem"
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          className="p-4 bg-indigo-100 w-full h-12"
        >
          <h1 className="text-2xl font-bold">
            <Link to="/">MyGPX</Link>
          </h1>

          <Stack gap=".5rem" direction='row'>
            <Link to="/settings">Settings</Link>
          </Stack>
        </Stack>

        <Stack direction="row" flexGrow={1}>
          <Stack className="w-48 h-full bg-white">

          </Stack>
          <Stack flexGrow={1}>
            <AppRouterView />
          </Stack>
        </Stack>
      </Stack>
    </HashRouter>
  );
};
