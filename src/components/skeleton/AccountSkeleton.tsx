import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const AccountSkeleton = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={100}
    height={40}
    viewBox="0 0 100 60"
    className="mr-3"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="53" y="22" rx="0" ry="0" width="170" height="18" />
    <circle cx="30" cy="32" r="12" />
  </ContentLoader>
);
