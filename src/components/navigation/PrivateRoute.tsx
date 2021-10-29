import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  component: (props: any) => JSX.Element;
}

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps) => {
  const now = new Date().valueOf();
  // const isAuthenticated = auth.token && auth.token.exp > now;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        true ? (
          React.createElement(component)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
