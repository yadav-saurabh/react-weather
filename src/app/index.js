import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLoginStatus } from "../actions/status";
import PrivateViewWrapper from "./privateViewWrapper";

import Login from "./../pages/login";
import Home from "./../pages/home";
import History from "./../pages/history";
import Public from "./../pages/public";
import Protected from "./../pages/protected";

const App = () => {
  const isLogged = useSelector(state => state.status.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken") || "";
    if (userToken) {
      dispatch(setLoginStatus(true));
    }
  });

  /* all auth routes like signup/password-reset/login page can be added here */
  const authRoutes = [{ path: "/login", component: Login }];
  /* all public routes */
  const publicRoutes = [{ path: "/public", component: Public }];
  /* all protected routes */
  const privateRoutes = [
    { path: "/", component: Home },
    { path: "/history", component: History },
    { path: "/protected", component: Protected }
  ];

  return (
    <BrowserRouter>
      <Switch>
        {/* all public roues */}
        {publicRoutes.map(d => (
          <Route key={d.path} exact path={d.path} component={d.component} />
        ))}
        {/* all auth roues */}
        {authRoutes.map(d => (
          <Route key={d.path} exact path={d.path} component={d.component} />
        ))}
        {/*  private rotes if logged in else redirect to login */}
        {privateRoutes.map(d => (
          <Route
            exact
            key={d.path}
            path={d.path}
            render={props =>
              isLogged ? (
                <PrivateViewWrapper {...props} component={d.component} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
