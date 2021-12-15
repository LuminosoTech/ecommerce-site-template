import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { ShippingRate, StoreBranding } from "@luminoso/ecommerce-sdk";
import { useCheckout } from "@luminoso/react-ecommerce-sdk";

import { NTText, TText } from "../../../../components/text/Text";
import { BaseInput } from "../../../../components/input/BaseInput";

interface CheckoutShippingProps {
  branding: StoreBranding;
}

export const CheckoutShipping = (props: CheckoutShippingProps) => {
  const { branding } = props;

  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);

  const history = useHistory();

  const checkout = useCheckout();

  useEffect(() => {
    if (checkout) {
      const setup = async () => {
        const data = await checkout.getShippingRates();
        setShippingRates(data);
      };
      setup();
    }
  }, [checkout]);

  const renderInfoSummary = useMemo(() => {
    return (
      <div>
        <div>
          <TText text="contact" />
        </div>
      </div>
    );
  }, []);

  const renderShippingMethod = useMemo(() => {
    const renderTitle = () => {
      return (
        <div className="">
          <TText element="h3" text="shippingMethod" className="mb-4" />
        </div>
      );
    };

    const renderShippingOptions = () => {
      return (
        <div className="p-4 border rounded-md">
          {shippingRates.map((shippingRate, index) => {
            const getPrice = () => {
              const dollars = Number(shippingRate.amount);

              return dollars.toLocaleString("en-US", { style: "currency", currency: shippingRate.currency });
            };

            return (
              <div key={index} className="flex justify-between">
                <div className="flex flex-col">
                  <NTText text={shippingRate.provider} />
                  <NTText element="h5" text={`${shippingRate.estimatedDays} business days`} />
                </div>
                <div>
                  <NTText text={getPrice()} />
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className="mt-10">
        {renderTitle()}
        {renderShippingOptions()}
      </div>
    );
  }, [shippingRates]);

  const renderForm = useMemo(() => {
    const navigateToShipping = () => {
      history.push(`/checkout/shipping`);
    };

    return (
      <form>
        {renderInfoSummary}
        {renderShippingMethod}

        <div className="flex items-center mt-4">
          <div
            className="flex px-4 py-5 mr-4 rounded-md cursor-pointer"
            style={{ backgroundColor: branding?.secondaryColor }}
            onClick={navigateToShipping}
          >
            <TText text="continueToShipping" />
          </div>
          <div className="px-5 cursor-pointer">
            <TText text="returnToCart" />
          </div>
        </div>
      </form>
    );
  }, [branding?.secondaryColor, history, renderInfoSummary, renderShippingMethod]);

  const children = <>{renderForm}</>;

  return <div className="">{children}</div>;
};
