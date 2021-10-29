import { useEffect, useState } from "react";
import { useLuminoso } from "@luminoso/react-ecommerce-sdk";
import { ProductGridCell } from "@luminoso/ecommerce-sdk";

import { ProductGrid } from "../../../../components/grid/ProductGrid";
import { TText } from "../../../../components/text/Text";

export const Showcase = () => {
  const ecommerceInstance = useLuminoso();

  const [products, setProducts] = useState<ProductGridCell[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      if (ecommerceInstance) {
        const allProducts = await ecommerceInstance.getAllProducts();
        setProducts(allProducts);
      }
    };

    getProducts();
  }, [ecommerceInstance]);

  const renderTitle = () => {
    return <TText element="h2" className="font-thin text-gray-600" text="showcaseTitle" />;
  };

  const renderProductsGrid = () => {
    return <ProductGrid products={products} />;
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-full ">
      {renderTitle()}
      {renderProductsGrid()}
    </section>
  );
};
