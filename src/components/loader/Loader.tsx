import "./Loader.scss";
import React from "react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export const Loader = (props: LoaderProps) => {
  const { className, color, ...rest } = props;

  return <div className={`${className} loader`} style={{ borderLeftColor: color }} {...rest} />;
};
