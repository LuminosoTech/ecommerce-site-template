import React from "react";

interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

export const ExpandMore = (props: SvgIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px" {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
);