import "./Identification.scss";
import { Redirect, Route, Switch } from "react-router";
import { LandingScreen } from "../common/landing/LandingScreen";
import { Login } from "./auth/Login";
import { SignUp } from "./signup/SignUp";
import { OAuthCallbackHandlerRoute } from "../../components/navigation/OAuthCallbackHandlerRoute";
import { CartScreen } from "../common/cart/CartScreen";
import { CheckoutScreen } from "../common/checkout/CheckoutScreen";
import { OrderScreen } from "../common/order/OrderScreen";
import { ProductScreen } from "../common/product/ProductScreen";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/try" component={SignUp} />
      <Route exact path="/" component={LandingScreen} />
      <Route path="/checkout" component={CheckoutScreen} />
      <Route path="/cart" component={CartScreen} />
      <Route path="/product/:productId" component={ProductScreen} />
      <Route path="/order/:orderId" component={OrderScreen} />
      <OAuthCallbackHandlerRoute path="/oauth2/redirect" />
      <Redirect to="/" />
    </Switch>
  );
};
