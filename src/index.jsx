import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import injectContext from "./store.jsx";
import Routes from "./routes.jsx";
import "./index.css";

const App = injectContext(Routes);

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);