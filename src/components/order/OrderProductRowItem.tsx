import { NTText, TText } from "../text/Text";

interface OrderProductRowItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  productImage: string;
}

export const OrderProductRowItem = (props: OrderProductRowItemProps) => {
  const { id, title, price, productImage, quantity } = props;

  const getPrice = () => {
    const dollars = price;

    return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  return (
    <div className="flex w-full mt-5">
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
        <div>
          <TText text="quantity" />
          <NTText text={quantity.toString()} className="px-2" />
        </div>
      </div>
    </div>
  );
};
