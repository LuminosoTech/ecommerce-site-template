import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { initialize } from "@luminoso/react-ecommerce-sdk";

import "./css/index.scss";
import "./css/themes.scss";
import "slick-carousel/slick/slick.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import env from "./constants/environment";
import i18n from "./i18n/i18n";

const LuminosoProvider = initialize(env.LUMINOSO_SDK_TOKEN);

ReactDOM.render(
  <React.StrictMode>
    <LuminosoProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </LuminosoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
