interface SvgIconProps extends React.SVGAttributes<SVGElement> {}

const Hamburger = (props: SvgIconProps) => (
  <svg aria-hidden="true" viewBox="0 0 37 40" width="18px" height="18px" {...props}>
    <path d="M33.5 25h-30c-1.1 0-2-.9-2-2s.9-2 2-2h30c1.1 0 2 .9 2 2s-.9 2-2 2zm0-11.5h-30c-1.1 0-2-.9-2-2s.9-2 2-2h30c1.1 0 2 .9 2 2s-.9 2-2 2zm0 23h-30c-1.1 0-2-.9-2-2s.9-2 2-2h30c1.1 0 2 .9 2 2s-.9 2-2 2z" />
  </svg>
);

export default Hamburger;
