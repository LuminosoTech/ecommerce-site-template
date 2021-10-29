import React, { useState } from "react";
import { useHistory } from "react-router";

import { TText } from "../../../components/text/Text";
import { MaterialTextInput } from "../../../components/textinput/material/MaterialTextInput";

import { TranslationsKeys } from "../../../i18n";

export const Login = () => {
  const history = useHistory();

  const navigateToRegister = () => {
    history.push("/try");
  };

  const renderBackground = () =>
    // <div
    //   className="absolute flex items-center w-screen h-screen bg-center bg-cover o"
    //   style={{ backgroundImage: `url(${LoginBackground})`, filter: "blur(0px)" }}
    // ></div>
    null;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<keyof TranslationsKeys>();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<keyof TranslationsKeys>();

  const renderForm = () => {
    const renderTitle = <TText element="h2" text="login" className="my-5 font-semibold" />;

    const renderSingleSignOnOptions = () => {
      return <div className="my-5"></div>;
    };

    const renderDivider = () => {
      return (
        <div className="flex flex-row items-center justify-center ">
          <div className="flex-1 h-0.5 bg-black" />
          <TText className="flex-1 text-center" text="or" />
          <div className="flex-1  h-0.5 bg-black" />
        </div>
      );
    };

    const renderManualLogin = () => {
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };

      return (
        <form onSubmit={handleSubmit}>
          <MaterialTextInput
            required
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={emailError}
            className="my-2"
          />
          <MaterialTextInput
            required
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={passwordError}
            className="my-2"
          />

          <div className="flex justify-end mt-5 cursor-pointer">
            <TText element="h5" text="forgotPassword" />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full mt-5 rounded-sm cursor-pointer bg-primary hover:bg-primaryVariant"
          >
            <TText element="h3" text="login" color="custom" className="py-3 text-white" />
          </button>
        </form>
      );
    };

    const renderCreateAccount = () => {
      return (
        <div className="flex items-center justify-center mt-5">
          <TText element="h5" text="noAccount" className="mr-2" />
          <TText
            element="h5"
            text="signup"
            className="cursor-pointer text-primaryVariant"
            onClick={navigateToRegister}
          />
        </div>
      );
    };

    return (
      <div className="w-9/12 p-8 my-10 bg-white rounded-md shadow-md xl:w-3/12 lg:w-5/12 md:w-9/12 sm:w-full">
        {renderTitle}
        {renderSingleSignOnOptions()}
        {renderDivider()}
        {renderManualLogin()}
        {renderCreateAccount()}
      </div>
    );
  };

  const leftContent = () => {
    return <div className="z-50 flex justify-center flex-1">{renderForm()}</div>;
  };

  const children = (
    <>
      {renderBackground()}
      {leftContent()}
    </>
  );

  return <div className="flex w-screen h-screen sm:items-center">{children}</div>;
};
