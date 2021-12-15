import { useMemo } from "react";
import { PaymentMethod, useCheckout } from "@luminoso/react-ecommerce-sdk";
import { CheckoutAccountExpandable } from "../../../../components/checkout/form/CheckoutAccountExpandable";
import { CheckoutShippingAddressExpandable } from "../../../../components/checkout/form/CheckoutShippingAddressExpandable";
import { CheckoutShippingRatesExpandable } from "../../../../components/checkout/form/CheckoutShippingRateExpandable";
import { CheckoutPaymentMethodExpandable } from "../../../../components/checkout/form/CheckoutPaymentMethodExpandable";
import { Button } from "../../../../components/button/Button";

export const CheckoutPayment = () => {
  const checkout = useCheckout();

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
        <div className="w-full">
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

    return <div className="flex flex-col h-full my-4 md:flex-row">{renderForm()}</div>;
  }, [checkout]);

  return <div>{renderBody}</div>;
};
