import { useMemo, useState } from "react";

interface ProductImageViewerProps {
  images: string[];
}

export const ProductImageViewer = (props: ProductImageViewerProps) => {
  const { images } = props;

  const [selectedPicture, setSelectedPicture] = useState<string>(images[0]);

  const renderSelectedImage = useMemo(() => {
    return (
      <div
        className="w-full mr-4 bg-center bg-no-repeat bg-cover rounded-md shadow-sm cursor-pointer h-350"
        style={{
          backgroundImage: `url(${selectedPicture})`,
        }}
      />
    );
  }, [selectedPicture]);

  const renderImageThumbnails = useMemo(() => {
    const renderImages = () =>
      images.map((image, index) => {
        const handleClick = () => {
          setSelectedPicture(image);
        };

        return (
          <div
            key={index}
            className="h-20 mr-4 bg-center bg-no-repeat bg-cover rounded-md shadow-sm cursor-pointer w-28"
            style={{
              backgroundImage: `url(${image})`,
            }}
            onClick={handleClick}
          />
        );
      });

    return <div className="flex items-center justify-center mt-4 md:justify-start">{renderImages()}</div>;
  }, [images]);

  const children = (
    <>
      {renderSelectedImage}
      {renderImageThumbnails}
    </>
  );

  return <div className="w-full">{children}</div>;
};
