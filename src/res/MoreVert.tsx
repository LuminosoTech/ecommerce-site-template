import React from "react";

interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

export const MoreVert = (props: SvgIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px" {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
);
