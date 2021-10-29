import React, { useContext } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

interface OAuthCallbackHandlerRouteProps extends RouteProps {}

export const OAuthCallbackHandlerRoute = (props: OAuthCallbackHandlerRouteProps) => {
  const { component, ...rest } = props;

  const location = useLocation();

  // Using a # instead of ? prevents the browser from explicitly showing request params.
  // (Url as well as params panel in network console wont display params)
  const hiddenParams = location.hash.replace("#", "?");

  const params = new URLSearchParams(hiddenParams);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    // dispatch(storeTokenAction({ accessToken, refreshToken }));
  }

  return <Route {...rest} render={undefined} />;
};
