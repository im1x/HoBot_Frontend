import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import { store } from "@store/store";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import App from "./App.tsx";
import {BrowserRouter as Router} from "react-router";
import {ModalsProvider} from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider defaultColorScheme="dark">
      <Router>
        <Notifications />
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </Router>
    </MantineProvider>
  </Provider>
);
