import { useMemo } from "react";
import { OrderSummary } from "@luminoso/ecommerce-sdk";

import { NTText, TText } from "../text/Text";
import { ChevronRight } from "../../res/ChevronRight";

interface CustomerOrderProductsProps {
  status: string;
  summary: OrderSummary;
}

export const CustomerOrderProducts = (props: CustomerOrderProductsProps) => {
  const { status, summary } = props;
  const { products } = summary;

  const renderStackedImages = useMemo(() => {
    return products.map((product, index) => {
      return (
        <div
          className="h-20 bg-center bg-no-repeat bg-cover rounded-md shadow-sm w-28"
          style={{
            backgroundImage: `url(${product.productImage})`,
            transform: index !== 0 ? "translateX(-70%) translateY(25%)" : "",
          }}
        />
      );
    });
  }, [products]);

  const renderOrderInfo = useMemo(() => {
    const { subtotal, tax, shippingRate, total } = summary;

    const getTotal = () => {
      const dollars = total;

      return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
    };

    return (
      <div
        className="flex flex-col flex-1"
        style={{
          transform: "translateX(-10%)",
        }}
      >
        <div>
          <TText text="status" className="mr-2 font-bold" />
          <NTText text={status} />
        </div>
        <div>
          <TText text="trackingLink" className="mr-2 font-bold" />
          <NTText text={status} />
        </div>
        <div>
          <TText text="total" className="mr-2 font-bold" />
          <NTText text={getTotal()} />
        </div>
      </div>
    );
  }, [status, summary]);

  const renderIcon = useMemo(() => {
    return (
      <div className="flex items-center justify-end">
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
      </div>
    );
  }, []);
  return (
    <div className="flex w-full my-10 rounded-md cursor-pointer">
      {renderStackedImages}
      {renderOrderInfo}
      {renderIcon}
    </div>
  );
};
