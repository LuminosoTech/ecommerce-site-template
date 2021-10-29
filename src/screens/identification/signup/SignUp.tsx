import React, { useState } from "react";
import { useHistory } from "react-router";

import { NTText, TText } from "../../../components/text/Text";
import { MaterialTextInput } from "../../../components/textinput/material/MaterialTextInput";

export const SignUp = () => {
  const history = useHistory();

  const renderBackground = () =>
    // <div
    //   className="absolute flex items-center w-screen h-screen bg-center bg-cover o"
    //   style={{ backgroundImage: `url(${LoginBackground})`, filter: "blur(0px)" }}
    // ></div>
    null;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);

  const renderForm = () => {
    const renderHeader = () => {
      return (
        <div className="flex flex-col items-center w-full text-center">
          {/* <TText element="h2" text="getStartedForFree" className="mb-5 font-semibold" /> */}
          {/* <TText element="h5" text="getStartedDescription" className="mb-3" /> */}
        </div>
      );
    };

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

    const renderForm = () => {
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };

      return (
        <form onSubmit={handleSubmit}>
          <MaterialTextInput
            required
            id="email"
            type="email"
            placeholder="email"
            className="my-2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <MaterialTextInput
            required
            id="name"
            type="text"
            placeholder="fullName"
            className="my-2"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <MaterialTextInput
            required
            type="password"
            placeholder="password"
            className="my-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="flex justify-start mt-5">
            <input
              type="checkbox"
              checked={agreedToPrivacyPolicy}
              className="mr-3"
              onChange={(e) => {
                setAgreedToPrivacyPolicy(e.target.checked);
              }}
            />
            <NTText
              element="h5"
              text="By clicking this box, you agree to our Terms of Service and have read and acknowledge our Privacy Policy."
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full mt-5 rounded-sm cursor-pointer bg-primary hover:bg-primaryVariant"
          >
            <TText element="h3" text="signup" color="custom" className="py-3 text-white" />
          </button>
        </form>
      );
    };

    const renderFooter = () => {
      const navigateToLogin = () => {
        history.push("/login");
      };

      return (
        <div className="flex items-center justify-center mt-5">
          <TText element="h5" text="alreadyHaveAnAccount" className="mr-2" />
          <TText element="h5" text="login" className="cursor-pointer text-primaryVariant" onClick={navigateToLogin} />
        </div>
      );
    };

    return (
      <div className="w-full p-8 my-10 bg-white rounded-md shadow-md xl:w-4/16 lg:w-5/12 md:w-9/12 sm:w-9/12">
        {renderHeader()}
        {renderSingleSignOnOptions()}
        {renderDivider()}
        {renderForm()}
        {renderFooter()}
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
