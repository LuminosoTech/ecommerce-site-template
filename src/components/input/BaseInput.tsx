import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";
import { TranslationsKeys } from "../../i18n";

interface BaseInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onFocusBorderColor?: string;
  placeholder: keyof TranslationsKeys;
  error?: keyof TranslationsKeys;
}

export const BaseInput = (props: BaseInputProps) => {
  const { error, className, style, placeholder, onFocusBorderColor, ...rest } = props;

  const { t } = useTranslation();

  const [isFocused, setIsFocused] = useState(false);

  const renderInput = () => {
    const hasErrorStyling = cx({
      "border-red-500": error,
    });

    return (
      <input
        style={{
          borderColor: isFocused ? onFocusBorderColor : "rgba(156, 163, 175, var(--tw-border-opacity))",
          transition: "border-color .3s",
          ...style,
        }}
        placeholder={t(placeholder)}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        className={`w-full px-4 py-2 border rounded-md placeholder-gray-500 ${hasErrorStyling}`}
        {...rest}
      />
    );
  };

  const children = <div className={`${className}`}>{renderInput()}</div>;

  return children;
};
