import "./utils/i18n.js";
import React from "react";
import App from "./App.jsx";
import "./styles/style.scss";
import i18next from "i18next";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: false,
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
              <ToastContainer />
            </BrowserRouter>
          </PersistGate>
        </I18nextProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
