import React, { useEffect } from "react";

import { AuthenticatedRoutes } from "./authenticated/AuthenticatedRoutes";
import { PublicRoutes } from "./identification/PublicRoutes";
import { useLocation } from "react-router";

export const ScreenRouting = () => {
  const { pathname } = useLocation();

  const isAuthenticated = false;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const children = !isAuthenticated ? <PublicRoutes /> : <AuthenticatedRoutes />;

  return children;
};
