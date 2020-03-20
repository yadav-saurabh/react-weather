import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import * as serviceWorker from "./serviceWorker";

import "antd/dist/antd.css";
import "./styles/index.scss";

/** View component to be imported at the end ( after the third party css import)
 * so that they don't override the css module styles.
 */
import App from "./app";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
