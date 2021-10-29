import { useHistory, useParams } from "react-router";
import { useOrder, useStore } from "@luminoso/react-ecommerce-sdk";
import { Order, StoreBranding } from "@luminoso/ecommerce-sdk";

import { useEffect, useMemo, useState } from "react";
import { NTText, TText } from "../../../components/text/Text";
import { OrderProductRowItem } from "../../../components/order/OrderProductRowItem";
import { CustomerOrderProducts } from "../../../components/order/CustomerOrderProducts";
import { Button } from "../../../components/button/Button";
import { BaseInput } from "../../../components/input/BaseInput";

interface RouteParams {
  orderId: string;
}

export const OrderScreen = () => {
  const [order, setOrder] = useState<Order>();
  const [storeBranding, setStoreBranding] = useState<StoreBranding>();

  const history = useHistory();
  const { orderId } = useParams<RouteParams>();

  const orderService = useOrder();
  const storeService = useStore();

  useEffect(() => {
    const setup = async () => {
      if (orderService) {
        const order = await orderService.getOrder(orderId);
        setOrder(order);
      }
      if (storeService) {
        const branding = await storeService.getStoreBranding();
        setStoreBranding(branding);
      }
    };
    setup();
  }, [orderId, orderService, storeService]);

  const renderCustomerOrders = useMemo(() => {
    const renderOrders = () => {
      if (order) {
        return (
          <CustomerOrderProducts
            status={order.status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
            summary={order.summary}
          />
        );
      }
    };

    const renderAccountForm = () => {
      const handleSubmit = () => {};

      return (
        <div className="pt-10 ">
          <TText element="h1" text="accessLater" />
          <TText element="h4" text="accessLaterDesc" args={["Soapoasis"]} className="py-4" />
          <form onSubmit={handleSubmit} className="">
            <BaseInput
              required
              type="email"
              placeholder="email"
              onChange={(e) => {
                // setEmail(e.target.value);
              }}
            />
            <BaseInput
              required
              type="password"
              placeholder="password"
              onChange={(e) => {
                // setPassword(e.target.value);
              }}
              className="mt-2"
            />

            <div className="flex justify-end w-full">
              <Button text="createAccount" textClassName="" className="px-10 py-2 mt-2" />
            </div>
          </form>
        </div>
      );
    };

    return (
      <div className="flex justify-center w-full md:w-1/3 lg:w-1/2 bg-gray-50">
        <div className="pt-20 pb-10 w-14/16 lg:w-10/16">
          <TText element="h1" text="myOrders" className="" />
          {renderOrders()}
          {renderAccountForm()}
        </div>
      </div>
    );
  }, [order]);

  const renderOrder = useMemo(() => {
    const renderOrderHeader = () => {
      const renderStoreIcon = () => {
        if (storeBranding) {
          return (
            <img className="p-2 mb-4 rounded-full shadow-md w-14 h-14" src={storeBranding.icon} alt="store icon" />
          );
        }
      };

      const renderStatus = () => {
        const orderStatus = order?.status;

        return (
          <div className="mr-2">
            <TText text="status" className="font-bold" />
            <NTText text=":" className="pr-2" />
            <NTText text={orderStatus?.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())} />
          </div>
        );
      };

      return (
        <div className="flex flex-col items-center">
          {renderStoreIcon()}
          <NTText element="h2" text="Order #3001" className="my-3 font-medium" />

          <div className="flex">
            {renderStatus()}
            <div>
              <TText text="date" className="font-bold" />
              <NTText text=":" className="pr-2" />
              <NTText text="1 Oct, 14:43" />
            </div>
          </div>
        </div>
      );
    };

    const renderCartProducts = () => {
      const renderProducts = () => {
        if (order) {
          return order.summary.products.map((product, index) => (
            <OrderProductRowItem
              key={index}
              id={product.id}
              title={product.name}
              price={product.price}
              quantity={product.quantity}
              productImage={product.productImage}
            />
          ));
        }
      };

      const renderDelivery = () => {
        if (order && order.summary) {
          const shippingRate = order.summary.shippingRate;
          const getPrice = () => {
            const dollars = Number(shippingRate.amount);
            return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };
          return (
            <div className="py-5 ">
              <div className="flex justify-between">
                <TText text="delivery" />
                <NTText text={`${getPrice()} (${shippingRate.provider})`} />
              </div>
            </div>
          );
        }
      };

      const renderSubTotal = () => {
        if (order && order.summary) {
          const getPrice = () => {
            const total = order.summary.subtotal;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };
          return (
            <div className="py-5">
              <div className="flex justify-between">
                <TText text="subtotal" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      const renderTaxes = () => {
        if (order && order.summary.tax) {
          const getPrice = () => {
            const tax = order.summary.tax;
            return tax.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };
          return (
            <div className="py-5">
              <div className="flex justify-between">
                <TText text="taxes" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      const renderTotal = () => {
        if (order && order.summary.total) {
          const getPrice = () => {
            const total = order.summary.total;
            return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
          };
          return (
            <div className="py-5">
              <div className="flex justify-between">
                <TText text="total" className="font-bold" />
                <NTText text={`${getPrice()}`} />
              </div>
            </div>
          );
        }
      };

      return (
        <div className="w-full h-full">
          {renderProducts()}
          {renderDelivery()}
          {renderSubTotal()}
          {renderTaxes()}
          {renderTotal()}
        </div>
      );
    };

    const renderTackingProgress = () => {};

    return (
      <div className="flex justify-center bg-white shadow-sm md:overflow-scroll md:w-2/3 lg:w-1/2">
        <div className="flex flex-col items-center h-full pt-20 w-14/16 md:w-2/3 lg:w-1/2">
          {renderOrderHeader()}
          <div className="h-0.5 bg-gray-200 w-full my-5" />
          <div className="flex flex-col w-full">
            <TText text="orderSummary" className="font-bold" />
            {renderCartProducts()}
          </div>
          <div className="h-0.5 bg-gray-200 w-full my-5" />
          <div className="flex flex-col w-full pb-20">
            <TText text="trackingProgress" className="font-bold" />
            {renderTackingProgress()}
          </div>
        </div>
      </div>
    );
  }, [order, storeBranding]);

  const children = (
    <>
      {renderCustomerOrders}
      {renderOrder}
    </>
  );

  return <div className="flex flex-col w-full h-full overflow-scroll md:flex-row md:overflow-hidden">{children}</div>;
};
