import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { ShippingSupportedCountry, ShippingSupportedState, StoreBranding } from "@luminoso/ecommerce-sdk";
import { useCheckout } from "@luminoso/react-ecommerce-sdk";

import { TText } from "../../../../components/text/Text";
import { BaseInput } from "../../../../components/input/BaseInput";
import { keyBy } from "../../../../utils/object";
import { Button } from "../../../../components/button/Button";

interface CheckoutInformationProps {
  branding: StoreBranding;
}

export const CheckoutInformation = (props: CheckoutInformationProps) => {
  const { branding } = props;

  const history = useHistory();

  const checkout = useCheckout();

  const [shippingSupportedCountries, setShippingSupportedCountries] = useState<{
    [key: string]: ShippingSupportedCountry;
  }>({});

  const [shippingSupportedStates, setShippingSupportedStates] = useState<{ [key: string]: ShippingSupportedState }>({});

  const [email, setEmail] = useState("");
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [persistContactInformation, setPersistContactInformation] = useState(false);

  const [isPostingCheckoutInfo, setIsPostingCheckoutInfo] = useState(false);

  useEffect(() => {
    if (checkout) {
      const setup = async () => {
        const supportedShippingLocations = await checkout.getSupportedShippingLocations();
        setShippingSupportedCountries(keyBy(supportedShippingLocations, (item) => item.id));
        if (supportedShippingLocations.length > 0) {
          const firstCountry = supportedShippingLocations[0];
          setCountry(firstCountry.id);

          if (firstCountry.states.length > 0) {
            const states = firstCountry.states;

            setShippingSupportedStates(keyBy(states, (item) => item.id));

            const firstStates = states[0];
            setState(firstStates.id);
          }
        }
      };
      setup();
    }
  }, [checkout]);

  const renderContactInfo = useMemo(() => {
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

    const handleNewsletterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubscribeToNewsletter(e.target.checked);
    };

    return (
      <div>
        <TText element="h3" text="contactInformation" className="mb-5" />
        <BaseInput
          required
          name="email"
          type="email"
          placeholder="contactInformationDesc"
          value={email}
          onChange={handleEmailChange}
        />
        <div className="flex items-center mt-3 cursor-pointer">
          <input type="checkbox" className="mr-2" checked={subscribeToNewsletter} onChange={handleNewsletterClick} />
          <TText element="h4" text="contactInfoSubcribe" />
        </div>
      </div>
    );
  }, [email, subscribeToNewsletter]);

  useMemo(() => {
    const shippingSupportedCountry = shippingSupportedCountries[country];

    if (shippingSupportedCountry) {
      setShippingSupportedStates(keyBy(shippingSupportedCountry.states, (item) => item.id));
    }
  }, [country, shippingSupportedCountries]);

  const renderShippingAddress = useMemo(() => {
    const renderShippingForm = () => {
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

      const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        console.log(value);
        setCountry(value);
      };

      const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setState(value);
      };

      const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setZip(value);
      };

      const handlePersistInformationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersistContactInformation(e.target.checked);
      };

      return (
        <div className="">
          <TText element="h3" text="shippingAddress" className="mb-4" />
          <div className="flex mb-4">
            <BaseInput
              className="flex-1 mr-4"
              onFocusBorderColor={branding?.secondaryColor}
              placeholder="firstNameOptional"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <BaseInput
              required
              className="flex-1"
              placeholder="lastName"
              onFocusBorderColor={branding?.secondaryColor}
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <BaseInput
              required
              placeholder="address"
              onFocusBorderColor={branding?.secondaryColor}
              className="flex-1 mb-4"
              value={street1}
              onChange={handleAddressChange}
            />
            <BaseInput
              placeholder="aptSuite"
              className="flex-1 mb-4"
              onFocusBorderColor={branding?.secondaryColor}
              value={street2}
              onChange={handleAptSuiteChange}
            />
            <BaseInput
              required
              placeholder="city"
              className="flex-1"
              onFocusBorderColor={branding?.secondaryColor}
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div className="flex">
            <div className="relative w-1/3 mr-4 border border-gray-400 rounded-md">
              <label htmlFor="country_select" className="absolute pl-3 my-2 pointer-events-none">
                <TText element="h5" text="country" className="text-gray-500" />
              </label>
              <select
                id="country_select"
                required
                autoComplete="shipping country"
                className="w-full pt-6 pb-1 pl-3 text-sm rounded-md"
                value={country}
                onChange={handleCountryChange}
              >
                {Object.values(shippingSupportedCountries).map((shippingSupportedCountry, index) => (
                  <option key={index} value={shippingSupportedCountry.id} className="pl-4">
                    {shippingSupportedCountry.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-1/3 mr-4 border border-gray-400 rounded-md">
              <label htmlFor="province_select" className="absolute pl-3 my-2 pointer-events-none">
                <TText element="h5" text="province" className="text-gray-500" />
              </label>
              <select
                id="province_select"
                required
                autoComplete="shipping address-level1"
                className="w-full pt-6 pb-1 pl-3 text-sm rounded-md"
                value={state}
                onChange={handleStateChange}
              >
                {Object.values(shippingSupportedStates).map((shippingSupportedState, index) => (
                  <option key={index} value={shippingSupportedState.id} className="">
                    {shippingSupportedState.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/3">
              <BaseInput
                required
                placeholder="postalCode"
                className="w-full"
                onFocusBorderColor={branding?.secondaryColor}
                value={zip}
                onChange={handleZipChange}
              />
            </div>
          </div>
          <div className="flex items-center mt-3 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={persistContactInformation}
              onChange={handlePersistInformationChange}
            />
            <TText element="h4" text="saveForNextTime" />
          </div>
        </div>
      );
    };

    return <div className="mt-10">{renderShippingForm()}</div>;
  }, [
    branding?.secondaryColor,
    checkout,
    city,
    country,
    firstName,
    lastName,
    persistContactInformation,
    shippingSupportedCountries,
    shippingSupportedStates,
    state,
    street1,
    street2,
    zip,
  ]);

  const renderForm = useMemo(() => {
    const navigateToShipping = () => {
      history.push(`/checkout/shipping`);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPostingCheckoutInfo(true);

      if (checkout) {
        await checkout.postAccountInfo({ email });
        await checkout.postCustomerAddress({
          firstName,
          lastName,
          streetNo: "48",
          street1,
          street2,
          city,
          country: shippingSupportedCountries[country].name,
          state: shippingSupportedStates[state].name,
          zip,
        });

        navigateToShipping();
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        {renderContactInfo}
        {renderShippingAddress}

        <div className="flex items-center mt-4">
          <Button
            type="submit"
            text="continueToShipping"
            className="flex items-center justify-center py-3 w-52"
            isLoading={isPostingCheckoutInfo}
            loaderColor={branding?.secondaryColor}
          />

          <div className="px-5 cursor-pointer">
            <TText text="returnToCart" />
          </div>
        </div>
      </form>
    );
  }, [
    branding?.secondaryColor,
    checkout,
    city,
    country,
    email,
    firstName,
    history,
    isPostingCheckoutInfo,
    lastName,
    renderContactInfo,
    renderShippingAddress,
    shippingSupportedCountries,
    shippingSupportedStates,
    state,
    street1,
    street2,
    zip,
  ]);

  const children = <>{renderForm}</>;

  return <div className="">{children}</div>;
};
