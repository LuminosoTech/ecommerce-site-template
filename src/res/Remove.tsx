import React from "react";

interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

export const Remove = (props: SvgIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13H5v-2h14v2z" />
  </svg>
);
