import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShippingRate } from "@luminoso/ecommerce-sdk";
import { useCheckout } from "@luminoso/react-ecommerce-sdk";

import { Button } from "../../button/Button";
import { Expandable } from "../../expandable/Expandable";
import { NTText, TText } from "../../text/Text";
import { DoneCheckmark } from "../../../res/DoneCheckmark";

interface CheckoutShippingRatesExpandableProps {
  placeHolderClassName?: string;
}

export const CheckoutShippingRatesExpandable = (props: CheckoutShippingRatesExpandableProps) => {
  const checkout = useCheckout();

  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate>();

  const [open, setOpen] = useState(false);

  const { placeHolderClassName } = props;

  useEffect(() => {
    const init = async () => {
      if (checkout) {
        const shippingRates = await checkout.getShippingRates();
        setRates(shippingRates);
      }
    };
    init();
  }, [checkout]);

  const placeholder = () => {
    const handleClick = () => {
      setOpen(!open);
    };

    const getPrice = () => {
      const dollars = Number(selectedRate?.amount);

      return dollars.toLocaleString("en-US", { style: "currency", currency: selectedRate?.currency });
    };

    const renderSelectedRate = () => {
      if (selectedRate) {
        return (
          <div className="flex items-center">
            <img src={selectedRate?.providerImage} alt={`${selectedRate?.provider}-img`} className="w-12 mr-2" />
            <NTText text={getPrice()} className="mr-2" />
            <NTText text={selectedRate?.provider} className="mr-2" />
          </div>
        );
      } else {
        return (
          <div>
            <NTText text="no selected rate" />
          </div>
        );
      }
    };

    return (
      <div
        className={`flex items-center justify-between px-2 py-2 border rounded-md shadow-sm ${placeHolderClassName}`}
      >
        <div className="p-2">
          <div className="flex items-center py-2">
            <TText allCaps text="shippingRate" className="mr-4" />
            <DoneCheckmark className="w-5 h-5" />
          </div>
          {renderSelectedRate()}
        </div>
        <div className="p-2">
          <Button text="change" onClick={handleClick} />
        </div>
      </div>
    );
  };

  const expandableContent = () => {
    const renderRates = () => {
      return rates.map((rate, index) => {
        const getPrice = () => {
          const dollars = Number(rate.amount);

          return dollars.toLocaleString("en-US", { style: "currency", currency: rate.currency });
        };

        const handleRateClick = () => {
          setSelectedRate(rate);
          checkout?.postSelectedShippingRate(rate.id);
        };

        return (
          <div className="flex items-center p-4 mb-4 border rounded-md cursor-pointer" onClick={handleRateClick}>
            <img src={rate.providerImage} alt={`${rate.provider}-img`} className="w-12 mr-4" />

            <NTText text={rate.provider} className="mr-2" />
            <TText text="arrivesIn" args={[rate.estimatedDays]} className="mr-2" />
            <NTText text={getPrice()} className="mr-2" />
          </div>
        );
      });
    };

    return (
      <motion.div
        variants={{ collapsed: { opacity: 0.4 }, open: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="flex flex-col py-4">{renderRates()}</div>
      </motion.div>
    );
  };

  return (
    <div>
      <Expandable isOpen={open} placeholder={placeholder} expandableContent={expandableContent} />
    </div>
  );
};
