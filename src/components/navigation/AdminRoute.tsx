import { IdentificationState, SelectorState } from "@store/reducers";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
    component: (props: any) => JSX.Element;
}

export const AdminRoute = ({ component, ...rest }: PrivateRouteProps) => {
    const { auth } = useSelector<SelectorState, IdentificationState>((state) => state.identification);

    const isAdmin = true;

    return (
        <Route
            {...rest}
            render={() =>
                isAdmin ? (
                    React.createElement(component)
                ) : (
                    <Redirect
                        to={{
                            pathname: "/dashboard",
                        }}
                    />
                )
            }
        />
    );
};
