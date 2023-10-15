import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import { store } from "./store/store.ts";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
