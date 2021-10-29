import { useMemo } from "react";

import { TText } from "../../../../components/text/Text";
import { TranslationsKeys } from "../../../../i18n";

import { Instagram } from "../../../../res/Instagram";
import { Youtube } from "../../../../res/Youtube";
import { BitcoinBlack } from "../../../../res/crypto/Bitcoin-black";
import { AmexOutline } from "../../../../res/payments/outline/Amex-outline";
import { MastercardOutline } from "../../../../res/payments/outline/Mastercard-outline";
import { VisaOutline } from "../../../../res/payments/outline/Visa-outline";
import { EthereumBlack } from "../../../../res/crypto/Ethereum-black";
import { ApplePay } from "../../../../res/payments/ApplePay";

interface PolicyLink {
  text: keyof TranslationsKeys;
}

export const Footer = () => {
  const renderTop = useMemo(() => {
    const renderPolicies = () => {
      const policyLinks: PolicyLink[] = [
        { text: "shippingPolicy" },
        { text: "refundPolicy" },
        { text: "privacyPolicy" },
        { text: "termsOfService" },
      ];

      return (
        <div className="flex-1">
          <TText element="h4" text="information" allCaps className="mb-8 text-gray-700" />
          <div className="py-4 ">
            {policyLinks.map((link, index) => {
              return (
                <div className="flex" key={index}>
                  <TText
                    element="h3"
                    text={link.text}
                    className="mb-10 font-light text-gray-600 cursor-pointer hover:text-gray-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const renderCompany = () => {
      return (
        <div className="flex flex-col flex-1 mb-8">
          <TText element="h4" text="companyName" className="mb-8 text-gray-700" />
          <TText element="h4" text="infoEmail" className="mb-8 text-gray-700" />
          <TText element="h4" text="contactNumber" className="mb-8 text-gray-700" />
          <TText element="h4" text="companyLocation" className="mb-8 text-gray-700" />
        </div>
      );
    };

    const renderNewsletter = () => {
      return (
        <div className="flex-1" style={{ flex: 1 }}>
          <TText element="h3" text="newsletter" className="mb-4 font-light text-gray-700 " />
          <div className="flex">
            <input
              placeholder="Email address"
              className="w-full px-4 py-2 border-black border-solid"
              style={{ borderWidth: 1 }}
            />
            <button className="bg-gray-400 px-7">
              <TText element="h3" text="subscribe" className="text-white" />
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-full px-10 pb-10 md:flex-row md:justify-between md:items-start md:w-3/4">
          {renderPolicies()}
          {renderCompany()}
          {renderNewsletter()}
        </div>
      </div>
    );
  }, []);

  const renderBottom = useMemo(() => {
    const renderSocialMedia = () => {
      return (
        <div className="flex">
          <Instagram className="mr-2 cursor-pointer " />
          <Youtube className="cursor-pointer" />
        </div>
      );
    };

    const renderCopyright = () => {
      return (
        <div>
          <TText text="copyright" />
        </div>
      );
    };

    const renderSupportedPayments = () => {
      const classNames = "w-10 h-8 mr-2";

      return (
        <div className="flex py-10">
          <AmexOutline className={classNames} />
          <MastercardOutline className={classNames} />
          <VisaOutline className={classNames} />
          <ApplePay className={classNames} />
          <BitcoinBlack className={classNames} />
          <EthereumBlack className={classNames} />
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center justify-center p-10">
        {renderSocialMedia()}
        {renderSupportedPayments()}
        {renderCopyright()}
      </div>
    );
  }, []);

  const renderDivider = useMemo(() => {
    return <div className="w-full h-0.5 bg-gray-300" />;
  }, []);

  const children = (
    <>
      {renderTop}
      {renderDivider}
      {renderBottom}
    </>
  );

  return <footer className="w-full mt-10">{children}</footer>;
};
