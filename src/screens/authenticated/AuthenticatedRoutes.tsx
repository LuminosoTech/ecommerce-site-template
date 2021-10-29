import { Redirect, Route, Switch } from "react-router";

import { LandingScreen } from "../common/landing/LandingScreen";
import { PastOrdersScreen } from "./orders/PastOrdersScreen";

export const AuthenticatedRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LandingScreen} />
        <>
          <div className="flex w-full">
            <Switch>
              <Route exact path="/orders" component={PastOrdersScreen} />
              <Redirect to="/orders" />
            </Switch>
          </div>
        </>
      </Switch>
    </>
  );
};
