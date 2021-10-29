import "./SearchInput.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";

import { TranslationsKeys } from "@i18n/index";
import { TText } from "@components/text/Text";

interface SearchInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  placeholder: keyof TranslationsKeys;
  error?: keyof TranslationsKeys;
}

export const SearchInput = (props: SearchInputProps) => {
  const { error, className, style, placeholder, ...rest } = props;

  const { t } = useTranslation();

  const renderError = () => {
    return (
      <div className="h-5">
        <CSSTransition
          in={Boolean(error)}
          classNames="error-transition"
          timeout={200}
          appear={true}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <>{error && <TText text={error} className="py-2 pl-3 text-error" element="h5" />}</>
        </CSSTransition>
      </div>
    );
  };

  const renderInput = () => {
    const hasErrorStyling = cx({
      "border-gray-500": !error,
      "border-red-500": error,
    });

    return (
      <input
        style={{
          transition: "border-color .3s",
          backgroundImage: `url('data:image/svg+xml;utf8,  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 8px center",
          backgroundSize: "16px 16px",
          paddingLeft: 30,
          ...style,
        }}
        placeholder={t(placeholder)}
        className={`w-full px-2 py-1 border rounded-md ${hasErrorStyling}`}
        {...rest}
      />
    );
  };

  const children = (
    <div className={`flex flex-col w-full search_input ${className}`}>
      {renderInput()}
      {renderError()}
    </div>
  );

  return children;
};
