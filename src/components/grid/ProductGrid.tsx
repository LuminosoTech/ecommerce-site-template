import { useMemo } from "react";
import { useAnalytics } from "@luminoso/react-ecommerce-sdk";
import { ProductGridCell } from "@luminoso/ecommerce-sdk";

import { NTText } from "../text/Text";
import { useHistory } from "react-router";

interface ProductGridProps {
  products: ProductGridCell[];
}

export const ProductGrid = (props: ProductGridProps) => {
  const { products } = props;

  const analytics = useAnalytics();

  const history = useHistory();

  const renderProducts = useMemo(() => {
    return products.map((product, index) => {
      const getPrice = () => {
        const dollars = product.price;

        return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
      };

      const handleProductClick = () => {
        if (analytics) {
          analytics.trackProductClick({ productId: product.id, url: window.location.pathname });
        }

        history.push(`/product/${product.id}`);
      };

      return (
        <div key={index} className="w-full cursor-pointer h-50" onClick={handleProductClick}>
          <img src={product.thumbnailUrl} alt={product.name} className="w-full " />
          <div className="flex flex-col pt-5">
            <NTText text={product.name} />
            <NTText text={getPrice()} className="pt-2" />
          </div>
        </div>
      );
    });
  }, [analytics, history, products]);

  const children = (
    <div
      className="grid grid-cols-1 py-20 sm:grid-cols-2 md:grid-cols-4 lg::grid-cols-4 w-12/16 "
      style={{ rowGap: 20, columnGap: 20 }}
    >
      {renderProducts}
    </div>
  );

  return <div className="flex items-center justify-center w-full">{children}</div>;
};
