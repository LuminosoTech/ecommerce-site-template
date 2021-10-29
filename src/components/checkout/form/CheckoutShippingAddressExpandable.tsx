import { useCheckout } from "@luminoso/react-ecommerce-sdk";

import { Button } from "../../button/Button";
import { Expandable } from "../../expandable/Expandable";
import { NTText, TText } from "../../text/Text";
import { MaterialTextInput } from "../../textinput/material/MaterialTextInput";
import { DoneCheckmark } from "../../../res/DoneCheckmark";
import { motion } from "framer-motion";
import { useState } from "react";

interface CheckoutShippingAddressExpandableProps {
  placeHolderClassName?: string;
}

export const CheckoutShippingAddressExpandable = (props: CheckoutShippingAddressExpandableProps) => {
  const checkout = useCheckout();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

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
            <TText allCaps text="shippingAddress" className="mr-4" />
            <DoneCheckmark className="w-5 h-5" />
          </div>
          <div>
            <NTText text="1234 street Montréal (Ville-Marie), Quebec, ABC123" className="mr-2" />
            <NTText text="(123) 123-1234" />
          </div>
        </div>
        <div className="p-2">
          <Button text="change" onClick={handleClick} />
        </div>
      </div>
    );
  };

  const expandableContent = () => {
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFirstName(value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLastName(value);
    };

    const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStreet1(value);

      const addresses = await checkout?.getAddressAutocomplete(value);
      console.log("addresses", addresses);
    };

    const handleAptSuiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStreet2(value);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCity(value);
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCountry(value);
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setState(value);
    };

    const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setZip(value);
    };

    const handleSaveAddress = async () => {
      if (checkout) {
        await checkout.postCustomerAddress({
          firstName,
          lastName,
          streetNo: "48",
          street1,
          street2,
          city,
          country,
          state,
          zip,
        });

        // const rates = await checkout.getShippingRates();
      }
    };

    return (
      <motion.div
        variants={{ collapsed: { opacity: 0.4 }, open: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <div className="flex flex-col py-4">
          <div className="flex">
            <div className="flex-1 h-full mb-4 mr-4 border rounded-sm ">
              <MaterialTextInput placeholder="firstName" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <div className="flex-1 h-full border rounded-sm ">
              <MaterialTextInput placeholder="lastName" value={lastName} onChange={handleLastNameChange} />
            </div>
          </div>
          <div className="flex">
            <div className="w-3/4 h-full mb-4 mr-4 border rounded-sm ">
              <MaterialTextInput placeholder="address" value={street1} onChange={handleAddressChange} />
            </div>
            <div className="w-1/4 h-full border rounded-sm ">
              <MaterialTextInput placeholder="aptSuite" value={street2} onChange={handleAptSuiteChange} />
            </div>
          </div>
          <div className="flex">
            <div className="flex-1 h-full mb-4 mr-4 border rounded-sm ">
              <MaterialTextInput placeholder="city" value={city} onChange={handleCityChange} />
            </div>
            <div className="flex-1 h-full">
              <MaterialTextInput placeholder="state" value={state} onChange={handleStateChange} />
            </div>
            <div className="flex-1 h-full">
              <MaterialTextInput placeholder="country" value={country} onChange={handleCountryChange} />
            </div>
          </div>
          <div className="flex">
            <div className="h-full border rounded-sm ">
              <MaterialTextInput placeholder="postalCode" value={zip} onChange={handleZipChange} />
            </div>
          </div>
          <div className="flex">
            <div className="h-full py-5">
              <Button text="saveAndDeliverHere" onClick={handleSaveAddress} />
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
