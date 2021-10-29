import { NTText } from "../text/Text";
import { PropsWithChildren, useMemo } from "react";

interface BadgeProps {
  content: number;
}

export const Badge = (props: PropsWithChildren<BadgeProps>) => {
  const { content, children } = props;

  const container = useMemo(() => {
    return (
      <div className="relative ">
        <div
          className="absolute flex items-center justify-center p-1 rounded-full w-7 h-7 "
          style={{ top: "-70%", right: "-50%" }}
        >
          <NTText element="h6" text={content.toString()} />
        </div>
        {children}
      </div>
    );
  }, [children, content]);

  return <>{container}</>;
};
