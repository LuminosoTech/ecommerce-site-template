import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { TranslationsKeys } from "../../i18n";

type HtmlTextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextColor = "primary" | "secondary" | "custom";

interface TextElementProps extends React.HTMLAttributes<HTMLHeadingElement> {
  element?: HtmlTextElement;
  text: string | JSX.Element;
  classNames: string;
}

const TextElement = (props: TextElementProps) => {
  const { text, classNames, ...rest } = props;

  switch (props.element) {
    case "h1":
      return (
        <h1 className={classNames} {...rest}>
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classNames} {...rest}>
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classNames} {...rest}>
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4 className={classNames} {...rest}>
          {text}
        </h4>
      );
    case "h5":
      return (
        <h5 className={classNames} {...rest}>
          {text}
        </h5>
      );
    case "h6":
      return (
        <h6 className={classNames} {...rest}>
          {text}
        </h6>
      );
    default:
      return (
        <span className={classNames} {...rest}>
          {text}
        </span>
      );
  }
};

interface TTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: keyof TranslationsKeys;
  color?: TextColor;
  args?: string[];
  element?: HtmlTextElement;
  allCaps?: boolean;
}

export const TText = (props: TTextProps) => {
  const { t } = useTranslation();
  const { text, color, args, allCaps, className, ...rest } = props;

  const handleText = () => {
    let translatedText = t(text);

    if (args && args.length > 0) {
      for (const arg of args) {
        translatedText = translatedText.replace("?", arg);
      }
    }

    if (translatedText.indexOf("<primary>") !== -1) {
      return (
        <>
          {translatedText.split("<primary>").map((text, index) => {
            const classNames = cx({
              "text-primaryVariant": index % 2 !== 0,
            });

            return (
              <span key={index} className={classNames}>
                {text}
              </span>
            );
          })}
        </>
      );
    }

    if (allCaps) {
      return translatedText.toUpperCase();
    }

    return translatedText;
  };
  const textClassNames = cx("font-mulish whitespace-pre-wrap leading-none", className, {
    "text-primaryTextColor": color === "primary",
    "text-secondaryTextColor": color === "secondary",
  });

  return <TextElement text={handleText()} classNames={textClassNames} {...rest} />;
};

TText.defaultProps = {};

interface NTTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  color?: TextColor;
  args?: string[];
  element?: HtmlTextElement;
  allCaps?: boolean;
}

export const NTText = (props: NTTextProps) => {
  const { text, color, args, allCaps, className, ...rest } = props;

  if (!text) {
    return null;
  }

  const handleText = () => {
    let nonTranslatedText = text;

    if (args && args.length > 0) {
      for (const arg of args) {
        nonTranslatedText = nonTranslatedText.replace("?", arg);
      }
    }

    if (allCaps) {
      return nonTranslatedText.toUpperCase();
    }

    return nonTranslatedText;
  };
  const textClassNames = cx(
    "font-mulish whitespace-pre-wrap leading-none",
    {
      "text-primaryTextColor": color === "primary",
      "text-secondaryTextColor": color === "secondary",
    },
    className
  );

  return <TextElement text={handleText()} classNames={textClassNames} {...rest} />;
};

NTText.defaultProps = {};
