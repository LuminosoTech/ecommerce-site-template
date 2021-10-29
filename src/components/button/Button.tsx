import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import { TText } from "../text/Text";
import { TranslationsKeys } from "../../i18n";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean;
  text: keyof TranslationsKeys;
  textClassName?: string;
}

export const Button = (props: ButtonProps) => {
  const { text, isLoading, className, textClassName, disabled, ...rest } = props;

  const { t } = useTranslation();

  const isDisabled = isLoading || disabled;

  const disabledContainerClassNames = cx({
    "border-gray-200 hover:bg-gray-100": !isDisabled,
    "cursor-not-allowed border-gray-400": isDisabled,
  });
  const disabledTextClassNames = cx({ "text-gray-700": !isDisabled, "text-gray-500 ": isDisabled });

  return (
    <div className="flex items-center justify-center">
      <button
        className={`px-3 py-1 border rounded-md shadow-sm cursor-pointer ${className} ${disabledContainerClassNames}`}
        disabled={isDisabled}
        {...rest}
      >
        <TText text={text} className={`${textClassName} ${disabledTextClassNames}`} />
      </button>
    </div>
  );
};
