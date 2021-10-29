import React from "react";

interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

export const EthereumBlack = (props: SvgIconProps) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM24.0376 9.60005L15.2 24.2638L24.0377 29.4877L32.8753 24.2638L24.0376 9.60005ZM24.0377 31.1611L15.2 25.9397L24.0375 38.3932L32.8805 25.9398L24.0377 31.1611Z"
      fill="black"
    />
  </svg>
);
