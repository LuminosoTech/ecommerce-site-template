import { useHistory, useParams } from "react-router";
import Dompurify from "dompurify";
import { useProduct, useCart } from "@luminoso/react-ecommerce-sdk";

import { useEffect, useMemo, useState } from "react";
import { NTText, TText } from "../../../components/text/Text";
import { Button } from "../../../components/button/Button";
import { Product } from "@luminoso/ecommerce-sdk";
import { ProductImageViewer } from "../../../components/product/ProductImageViewer";
import { Header } from "../../../components/header/Header";
import { Footer } from "../landing/footer/Footer";

interface RouteParams {
  productId: string;
}

export const ProductScreen = () => {
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams<RouteParams>();

  const productService = useProduct();
  const cartService = useCart();

  const history = useHistory();

  useEffect(() => {
    const setup = async () => {
      if (productService) {
        const product = await productService.getProductById(productId);
        setProduct(product);
      }
    };
    setup();
  }, [productId, productService]);

  const renderEmpty = () => {
    const handleClick = () => {
      history.push("/checkout");
    };

    return (
      <div>
        <TText element="h1" text="yourCart" />
        <Button text="goToCheckout" className="my-10" onClick={handleClick} />
      </div>
    );
  };

  const renderProductPictures = useMemo(() => {
    if (product) {
      return (
        <div className="w-full p-4 md:p-0 md:w-1/2">
          <ProductImageViewer images={product.pictures} />
        </div>
      );
    }
  }, [product]);

  const renderProductInfo = useMemo(() => {
    if (product) {
      const handleAddToCart = () => {
        if (cartService) {
          cartService.addToCart(product.id);
        }
      };

      const getPrice = () => {
        const dollars = Number(product.price);

        return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
      };

      return (
        <div className="p-4 md:px-10 md:pt-0 md:w-3/4 ">
          <div>
            <NTText element="h1" text={product.name} className="mb-4" />
            <NTText element="h2" text={getPrice()} className="mb-4" />
            <div>
              <Button text="addToCart" onClick={handleAddToCart} className="w-full py-2 mb-4" />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(product.description),
            }}
          />
        </div>
      );
    }
  }, [cartService, product]);

  const renderProduct = useMemo(() => {
    return (
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-center w-full md:flex-row md:w-4/6">
          {renderProductPictures}
          {renderProductInfo}
        </div>
      </div>
    );
  }, [renderProductInfo, renderProductPictures]);

  const children = <>{renderProduct}</>;

  return (
    <div className="w-full h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
