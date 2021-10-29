import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const SearchInputSkeleton = (props: IContentLoaderProps) => (
    <ContentLoader speed={2} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
        <rect x="5%" y="0" rx="0" ry="0" width="50%" height="15" />
        <rect x="5%" y="20" rx="0" ry="0" width="40%" height="15" />
    </ContentLoader>
);
