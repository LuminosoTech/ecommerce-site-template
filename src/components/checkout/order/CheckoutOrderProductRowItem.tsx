import { useMemo } from "react";
import { useCart } from "@luminoso/react-ecommerce-sdk";

import { NTText } from "../../text/Text";
import { Add } from "../../../res/Add";
import { Delete } from "../../../res/Delete";
import { Remove } from "../../../res/Remove";

interface CheckoutFormExpandableProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  productImage: string;
  onUpdate: () => void;
}

export const CheckoutOrderProductRowItem = (props: CheckoutFormExpandableProps) => {
  const { id, title, price, productImage, quantity, onUpdate } = props;

  const cart = useCart();

  const getPrice = () => {
    const dollars = price;

    return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  const renderOptions = useMemo(() => {
    const handleRemoveProduct = async () => {
      if (cart) {
        let updatedQuantity = quantity - 1;
        await cart.updateProductQuantity(id, updatedQuantity);
        onUpdate();
      }
    };

    const handleAddProduct = async () => {
      if (cart) {
        let updatedQuantity = quantity + 1;
        await cart.updateProductQuantity(id, updatedQuantity);
        onUpdate();
      }
    };

    const handleDeleteProduct = async () => {
      if (cart) {
        await cart.removeFromCart(id);
        onUpdate();
      }
    };

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center my-2">
          <Remove
            className="w-6 h-6 p-1 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={handleRemoveProduct}
          />
          <NTText text={quantity.toString()} className="px-4" />
          <Add className="w-6 h-6 p-1 border rounded-md cursor-pointer hover:bg-gray-50" onClick={handleAddProduct} />
        </div>
        <div>
          <Delete
            className="w-6 h-6 p-1 border rounded-md cursor-pointer hover:bg-gray-50"
            onClick={handleDeleteProduct}
          />
        </div>
      </div>
    );
  }, [cart, id, onUpdate, quantity]);

  return (
    <div className="flex w-fullmt-5">
      <div className="mr-4">
        <div
          className="h-20 bg-center bg-no-repeat bg-cover rounded-md w-28"
          style={{
            backgroundImage: `url(${productImage})`,
          }}
        />
      </div>
      <div className="flex flex-col w-full">
        <NTText text={title} />
        <NTText text={getPrice()} className="mt-2" />
        {renderOptions}
      </div>
    </div>
  );
};
