import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import {BrowserRouter} from 'react-router-dom';
import GlobalContextProvider from "./context/GlobalContextProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <GlobalContextProvider>
          <App/>
    </GlobalContextProvider>
</BrowserRouter>
);