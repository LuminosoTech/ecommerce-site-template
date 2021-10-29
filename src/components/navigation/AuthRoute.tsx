import { IdentificationState, SelectorState } from "@store/reducers";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

interface AuthRouteProps extends RouteProps {
    component: (props: any) => JSX.Element;
}

export const AuthRoute = (props: AuthRouteProps) => {
    const { component, ...rest } = props;

    const { auth } = useSelector<SelectorState, IdentificationState>((state) => state.identification);

    return (
        <Route {...rest} render={() => (!auth.token ? React.createElement(component) : <Redirect to="/dashboard" />)} />
    );
};
