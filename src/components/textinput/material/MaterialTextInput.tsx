import "./MaterialTextInput.scss";
import React, { useState } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { TText } from "../../text/Text";
import { CSSTransition } from "react-transition-group";
import { TranslationsKeys } from "../../../i18n";

interface MaterialTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noTranslate?: boolean;
  allCaps?: boolean;
  error?: keyof TranslationsKeys;
  placeholder: keyof TranslationsKeys;
}

export const MaterialTextInput = (props: MaterialTextInputProps) => {
  const [focused, setFocused] = useState(false);

  const transitionDuration = 300;

  const { t } = useTranslation();
  const { placeholder, noTranslate, allCaps, error, className, ...rest } = props;

  const handlePlaceholder = () => {
    const translatedPlaceholder = placeholder as string;
    if (noTranslate) {
      if (allCaps) {
        return translatedPlaceholder.toUpperCase();
      } else {
        return translatedPlaceholder;
      }
    }

    if (allCaps) {
      return t(translatedPlaceholder).toUpperCase();
    }

    return t(translatedPlaceholder);
  };

  const textInputClassNames = cx("text-input", className);

  const bottomBorderClassNames = cx("text_input_bottom_border");

  return (
    <div className="text_input_container">
      <div className="text_input_sub_container">
        <input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={256}
          placeholder={handlePlaceholder()}
          className={textInputClassNames}
          {...rest}
        />
        <CSSTransition
          in={focused}
          timeout={transitionDuration}
          appear={true}
          mountOnEnter={false}
          unmountOnExit={false}
          classNames="text_input_bottom_border-transition"
        >
          <div className={bottomBorderClassNames} />
        </CSSTransition>
      </div>

      <CSSTransition
        in={error !== undefined}
        timeout={transitionDuration}
        appear={true}
        mountOnEnter={false}
        unmountOnExit={true}
        classNames="text_input_error_container-transition"
      >
        <TText text={error!!} element="h5" className="text_input_error_text" />
      </CSSTransition>
    </div>
  );
};
