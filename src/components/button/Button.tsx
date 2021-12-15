import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import { TText } from "../text/Text";
import { TranslationsKeys } from "../../i18n";
import { Loader } from "../loader/Loader";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean;
  loaderColor?: string;
  text: keyof TranslationsKeys;
  textClassName?: string;
}

export const Button = (props: ButtonProps) => {
  const { text, isLoading, loaderColor, className, textClassName, disabled, ...rest } = props;

  const { t } = useTranslation();

  const isDisabled = isLoading || disabled;

  const disabledContainerClassNames = cx({
    "border-gray-200 hover:bg-gray-50": !isDisabled,
    "cursor-not-allowed border-gray-300": isDisabled,
  });
  const disabledTextClassNames = cx({ "text-gray-700": !isDisabled, "text-gray-500 ": isDisabled });

  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-3 py-1 border rounded-md shadow-sm cursor-pointer ${className} ${disabledContainerClassNames}`}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading ? (
          <Loader color={loaderColor} />
        ) : (
          <TText text={text} className={`${textClassName} ${disabledTextClassNames}`} />
        )}
      </button>
    </div>
  );
};
