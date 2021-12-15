import "./CheckoutScreen.scss";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router";
import { useCheckout, PaymentMethod, useCart, useStore } from "@luminoso/react-ecommerce-sdk";
import { CustomerSessionCheckout, StoreBranding } from "@luminoso/ecommerce-sdk";

import { useEffect, useMemo, useState } from "react";
import { NTText, TText } from "../../../components/text/Text";
import { CheckoutOrderProductRowItem } from "../../../components/checkout/order/CheckoutOrderProductRowItem";

import { CheckoutInformation } from "./information/CheckoutInformation";
import { CheckoutShipping } from "./shipping/CheckoutShipping";
import { CheckoutPayment } from "./payment/CheckoutPayment";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const CheckoutScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerSessionCheckout, setCustomerSessionCheckout] = useState<CustomerSessionCheckout>();
  const [branding, setBranding] = useState<StoreBranding>();

  const history = useHistory();
  const { path } = useRouteMatch();
  const location = useLocation();

  const checkout = useCheckout();
  const store = useStore();

  useEffect(() => {
    const setup = async () => {
      if (checkout) {
        const sessionOrder = await checkout.getCustomerSessionCheckout();
        setCustomerSessionCheckout(sessionOrder);
      }
      if (store) {
        const branding = await store.getStoreBranding();
        setBranding(branding);
      }
    };

    setup();
  }, [checkout, store]);

  const renderCheckoutRoutes = useMemo(() => {
    const renderHeader = () => {
      return (
        <div>
          <img src={branding?.icon} alt="icon" className="w-16 h-16" />
        </div>
      );
    };

    const renderBreadcrumb = () => {
      return <div />;
    };

    const renderFooter = () => {
      return (
        <div className="flex flex-col">
          <div className="h-0.5 bg-gray-200 my-5" />
          <div className="flex">
            <TText element="h5" text="refundPolicy" className="mr-4" />
            <TText element="h5" text="privacyPolicy" className="mr-4" />
            <TText element="h5" text="termsOfService" />
          </div>
        </div>
      );
    };

    return (
      <div className="flex justify-end flex-1">
        <div className="flex flex-col justify-between w-4/6 p-20">
          <div className="">
            <div className="mb-4">
              {renderHeader()}
              {renderBreadcrumb()}
            </div>
            <div className="">
              {branding && (
                <Switch location={location}>
                  <Route
                    path={`${path}/contact-information`}
                    component={() => <CheckoutInformation branding={branding} />}
                  />
                  <Route path={`${path}/shipping`} component={() => <CheckoutShipping branding={branding} />} />
                  <Route path={`${path}/payment`} component={CheckoutPayment} />
                  <Redirect to={`${path}/contact-information`} />
                </Switch>
              )}
            </div>
          </div>
          {renderFooter()}
        </div>
      </div>
    );
  }, [branding, location, path]);

  const renderSummary = useMemo(() => {
    const renderCartProducts = () => {
      const renderDivider = () => {
        return <div className="h-0.5 bg-gray-200 my-5" />;
      };

      const renderProducts = () => {
        const handleUpdate = async () => {
          // if (checkout) {
          //   const sessionOrder = await checkout.getCustomerSessionCheckout();
          //   setCustomerSessionCheckout(sessionOrder);
          // }
        };

        return (
          <div className="mb-4">
            {customerSessionCheckout?.products.map((product, index) => {
              return (
                <CheckoutOrderProductRowItem
                  key={index}
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  productImage={product.productImage}
                  onUpdate={handleUpdate}
                />
              );
            })}
          </div>
        );
      };

      const renderDelivery = () => {
        if (customerSessionCheckout) {
          const shippingRate = customerSessionCheckout.shippingRate;

          if (shippingRate) {
            const getPrice = () => {
              const dollars = Number(shippingRate.amount);

              return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
            };

            return (
              <div className="mb-4">
                <div className="flex justify-between">
                  <TText text="delivery" />
                  <NTText text={`${getPrice()} (${shippingRate.provider})`} />
                </div>
              </div>
            );
          } else {
            return (
              <div className="mb-4">
                <div className="flex justify-between">
                  <TText text="delivery" />
                  <TText element="h5" text="calculatedAtNextStep" />
                </div>
              </div>
            );
          }
        }
      };

      const renderSubTotal = () => {
        if (customerSessionCheckout && customerSessionCheckout.subtotal) {
          const getPrice = () => {
            const total = customerSessionCheckout.subtotal;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="">
              <div className="flex justify-between">
                <TText text="subtotal" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      const renderTaxes = () => {
        if (customerSessionCheckout) {
          if (customerSessionCheckout.tax) {
            const getPrice = () => {
              const tax = customerSessionCheckout.tax;
              return tax.toLocaleString("en-US", { style: "currency", currency: "USD" });
            };

            return (
              <div className="mb-4 ">
                <div className="flex justify-between">
                  <TText text="taxes" />
                  <NTText text={`${getPrice()}`} />
                </div>
              </div>
            );
          } else {
            return (
              <div className="mb-4">
                <div className="flex justify-between">
                  <TText text="taxes" />
                  <TText element="h5" text="calculatedAtNextStep" />
                </div>
              </div>
            );
          }
        }
      };

      const renderTotal = () => {
        if (customerSessionCheckout && customerSessionCheckout.total) {
          const getPrice = () => {
            const total = customerSessionCheckout.total;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="rounded-md">
              <div className="flex items-center justify-between">
                <TText element="h2" text="total" />
                <NTText element="h2" text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      return (
        <div className="flex flex-col w-full px-14 md:w-3/5">
          {renderProducts()}
          {renderDivider()}
          {renderDelivery()}
          {renderSubTotal()}
          {renderDivider()}
          {renderTaxes()}
          {renderTotal()}
        </div>
      );
    };

    return (
      <div className="flex flex-1 py-20 " style={{ backgroundColor: branding?.primaryColor }}>
        {renderCartProducts()}
      </div>
    );
  }, [branding?.primaryColor, customerSessionCheckout]);

  const children = (
    <>
      {renderCheckoutRoutes}
      {renderSummary}
    </>
  );

  return <div className="flex w-full h-full">{children}</div>;
};
