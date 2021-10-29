import { motion } from "framer-motion";
import { useState } from "react";
import { useCheckout } from "@luminoso/react-ecommerce-sdk";

import { Button } from "../../button/Button";
import { NTText, TText } from "../../text/Text";
import { MaterialTextInput } from "../../textinput/material/MaterialTextInput";
import { DoneCheckmark } from "../../../res/DoneCheckmark";
import { Expandable } from "../../expandable/Expandable";

interface CheckoutAccountExpandableProps {
  placeHolderClassName?: string;
}

export const CheckoutAccountExpandable = (props: CheckoutAccountExpandableProps) => {
  const checkout = useCheckout();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [open, setOpen] = useState(false);

  const { placeHolderClassName } = props;

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
            <TText allCaps text="account" className="mr-4" />
            <DoneCheckmark className="w-5 h-5" />
          </div>
          <div>
            <NTText text="test@gmail.com" className="mr-2" />
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
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      checkout?.postAccountInfo({ email: value });
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPhoneNumber(value);
      checkout?.postAccountInfo({ phoneNumber: value });
    };

    return (
      <motion.div
        variants={{ collapsed: { opacity: 0.4 }, open: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="flex flex-col py-4">
          <div className="flex">
            <div className="flex-1 h-full mr-10">
              <MaterialTextInput placeholder="emailAddress" value={email} onChange={handleEmailChange} />
            </div>
            <div className="flex-1 h-full">
              <MaterialTextInput placeholder="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </div>
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
