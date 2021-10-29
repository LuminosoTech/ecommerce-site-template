import { useHistory } from "react-router";
import { useCheckout, PaymentMethod, useCart } from "@luminoso/react-ecommerce-sdk";
import { CustomerSessionCartProduct, CustomerSessionCheckout } from "@luminoso/ecommerce-sdk";

import { useEffect, useMemo, useState } from "react";
import { NTText, TText } from "../../../components/text/Text";
import { CheckoutOrderProductRowItem } from "../../../components/checkout/order/CheckoutOrderProductRowItem";
import { CheckoutAccountExpandable } from "../../../components/checkout/form/CheckoutAccountExpandable";
import { CheckoutShippingAddressExpandable } from "../../../components/checkout/form/CheckoutShippingAddressExpandable";
import { CheckoutPaymentMethodExpandable } from "../../../components/checkout/form/CheckoutPaymentMethodExpandable";
import { CheckoutShippingRatesExpandable } from "../../../components/checkout/form/CheckoutShippingRateExpandable";
import { Button } from "../../../components/button/Button";

export const CheckoutScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerSessionCheckout, setCustomerSessionCheckout] = useState<CustomerSessionCheckout>();

  const history = useHistory();

  const checkout = useCheckout();

  useEffect(() => {
    const setup = async () => {
      if (checkout) {
        const sessionOrder = await checkout.getCustomerSessionCheckout();
        setCustomerSessionCheckout(sessionOrder);
      }
    };

    setup();
  }, [checkout]);

  const renderHeader = () => {
    return <TText element="h1" text="shoppingCart" />;
  };

  const renderBody = useMemo(() => {
    const renderForm = () => {
      const handleAddPaymentMethod = async (paymentMethod: PaymentMethod) => {
        if (checkout) {
          const nonce = await checkout.postPaymentMethod(paymentMethod);
          console.log("success none: ", nonce);
        }
      };

      const handlePlaceOrder = async () => {
        if (checkout) {
          await checkout.placeOrder();
        }
      };

      return (
        <div className="w-full md:w-3/5 ">
          <CheckoutAccountExpandable />
          <CheckoutShippingAddressExpandable placeHolderClassName="mt-2" />
          <CheckoutShippingRatesExpandable placeHolderClassName="mt-2" />
          <CheckoutPaymentMethodExpandable placeHolderClassName="mt-2" onAddPaymentMethod={handleAddPaymentMethod} />
          <div className="flex justify-end w-full py-10">
            <Button text="placeOrder" onClick={handlePlaceOrder} />
          </div>
        </div>
      );
    };

    const renderCartProducts = () => {
      const renderDivider = () => {
        return <div className="h-0.5 bg-gray-200 my-5" />;
      };

      const renderProducts = () => {
        const handleUpdate = async () => {
          if (checkout) {
            const sessionOrder = await checkout.getCustomerSessionCheckout();
            setCustomerSessionCheckout(sessionOrder);
          }
        };

        return customerSessionCheckout?.products.map((product, index) => {
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
        });
      };

      const renderDelivery = () => {
        if (customerSessionCheckout && customerSessionCheckout.shippingRate) {
          const shippingRate = customerSessionCheckout.shippingRate;

          const getPrice = () => {
            const dollars = Number(shippingRate.amount);

            return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="px-10 py-5">
              <div className="flex justify-between">
                <TText text="delivery" />
                <NTText text={`${getPrice()} (${shippingRate.provider})`} />
              </div>
            </div>
          );
        }
      };

      const renderSubTotal = () => {
        if (customerSessionCheckout && customerSessionCheckout.subtotal) {
          const getPrice = () => {
            const total = customerSessionCheckout.subtotal;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="px-10 py-5">
              <div className="flex justify-between">
                <TText text="subtotal" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      const renderTaxes = () => {
        if (customerSessionCheckout && customerSessionCheckout.tax) {
          const getPrice = () => {
            const tax = customerSessionCheckout.tax;
            return tax.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="px-10 py-5">
              <div className="flex justify-between">
                <TText text="taxes" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      const renderTotal = () => {
        if (customerSessionCheckout && customerSessionCheckout.total) {
          const getPrice = () => {
            const total = customerSessionCheckout.total;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };

          return (
            <div className="bg-gray-100 rounded-md">
              <div className="flex items-center justify-between p-10">
                <TText element="h1" text="total" />
                <NTText element="h1" text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      return (
        <div className="w-full h-full md:w-2/5">
          <div className="flex flex-col justify-center p-5 mt-4 border rounded-md shadow-sm md:mx-5 md:mt-0">
            <TText element="h3" text="yourOrder" />
            {renderDivider()}
            {renderProducts()}
            {renderDelivery()}
            {renderSubTotal()}
            {renderTaxes()}
            {renderTotal()}
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col h-full my-4 md:flex-row">
        {renderForm()}
        {renderCartProducts()}
      </div>
    );
  }, [checkout, customerSessionCheckout]);

  const children = (
    <div className="flex h-full p-4 md:items-center md:justify-center">
      <div className="flex flex-col md:w-11/12 lg:w-9/12 xl::w-7/12">
        {renderHeader()}
        {renderBody}
      </div>
    </div>
  );

  return <div className="w-full h-full">{children}</div>;
};
