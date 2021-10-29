import { PaymentMethod } from "@luminoso/react-ecommerce-sdk";

import { Button } from "../../button/Button";
import { Expandable } from "../../expandable/Expandable";
import { NTText, TText } from "../../text/Text";
import { MaterialTextInput } from "../../textinput/material/MaterialTextInput";
import { DoneCheckmark } from "../../../res/DoneCheckmark";
import { motion } from "framer-motion";
import { useState } from "react";
import { fns } from "payment";

interface CheckoutPaymentMethodExpandableProps {
  placeHolderClassName?: string;
  onAddPaymentMethod: (paymentMethod: PaymentMethod) => void;
}

export const CheckoutPaymentMethodExpandable = (props: CheckoutPaymentMethodExpandableProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [open, setOpen] = useState(false);

  const { placeHolderClassName, onAddPaymentMethod } = props;

  const placeholder = () => {
    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <div
        className={`flex items-center justify-between px-2 py-2 border rounded-md shadow-sm ${placeHolderClassName}`}
      >
        <div className="p-2">
          <div className="flex items-center py-2">
            <TText allCaps text="paymentMethod" className="mr-4" />
            <DoneCheckmark className="w-5 h-5" />
          </div>
          <div>
            <NTText text="Mastercard, ending in 4122" className="mr-2" />
            <NTText text="" />
          </div>
        </div>
        <div className="p-2">
          <Button text="change" onClick={handleClick} />
        </div>
      </div>
    );
  };

  const expandableContent = () => {
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const formattedValue = fns.formatCardNumber(value);
      setCardNumber(formattedValue);
    };

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFullName(value);
    };

    const handleExpiryChangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setExpiryDate(value);
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCVV(value);
    };

    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPostalCode(value);
    };

    const handlePayClick = () => {
      onAddPaymentMethod({
        cardNumber,
        cvv,
        expiryDate,
        fullName,
        postalCode,
      });
    };

    return (
      <motion.div
        variants={{ collapsed: { opacity: 0.4 }, open: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="flex flex-col py-4">
          <div className="flex">
            <div className="flex-1 h-full mb-4 border rounded-sm ">
              <MaterialTextInput
                required
                type="text"
                name="name"
                placeholder="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 h-full mb-4 border rounded-sm ">
              <MaterialTextInput
                required
                type="text"
                name="name"
                placeholder="fullName"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 h-full mb-4 mr-4 border rounded-sm ">
              <MaterialTextInput
                required
                type="tel"
                name="expiry"
                placeholder="expiryDate"
                pattern="\d\d/\d\d"
                value={expiryDate}
                onChange={handleExpiryChangeChange}
              />
            </div>
            <div className="w-1/4 h-full mr-4 border rounded-sm ">
              <MaterialTextInput required placeholder="cvc" pattern="\d{3,4}" value={cvv} onChange={handleCvvChange} />
            </div>
            <div className="flex-1 h-full mb-4 border rounded-sm ">
              <MaterialTextInput
                required
                type="text"
                name="postalCode"
                placeholder="postalCode"
                value={postalCode}
                onChange={handlePostalCodeChange}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button text="pay" className="px-20" onClick={handlePayClick} />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <Expandable isOpen={open} placeholder={placeholder} expandableContent={expandableContent} />
    </div>
  );
};
