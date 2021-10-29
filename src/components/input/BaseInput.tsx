import React from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";

import { TranslationsKeys } from "@i18n/index";
import { TText } from "@components/text/Text";

interface BaseInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  placeholder: keyof TranslationsKeys;
  error?: keyof TranslationsKeys;
}

export const BaseInput = (props: BaseInputProps) => {
  const { error, className, style, placeholder, ...rest } = props;

  const { t } = useTranslation();

  const renderInput = () => {
    const hasErrorStyling = cx({
      "border-gray-200": !error,
      "border-red-500": error,
    });

    return (
      <input
        style={{
          transition: "border-color .3s",
          ...style,
        }}
        placeholder={t(placeholder)}
        className={`w-full px-2 py-2 shadow-sm border rounded-md ${hasErrorStyling}`}
        {...rest}
      />
    );
  };

  const children = <div className={`${className}`}>{renderInput()}</div>;

  return children;
};
