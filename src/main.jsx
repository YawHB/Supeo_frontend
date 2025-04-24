import "./i18n.js";
import React from "react";
import App from "./App.jsx";
import i18next from "i18next";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
              <App />
              <ToastContainer />
            </BrowserRouter>
        </I18nextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
