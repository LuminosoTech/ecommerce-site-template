import { useHistory } from "react-router";
import { useLuminoso } from "@luminoso/react-ecommerce-sdk";

import { useEffect, useMemo, useState } from "react";
import { TText } from "../../../components/text/Text";
import { Header } from "../../../components/header/Header";
import { Footer } from "../landing/footer/Footer";
import { Button } from "../../../components/button/Button";

export const CartScreen = () => {
  const [products, setProducts] = useState();

  const history = useHistory();

  const renderTable = () => {
    return <TText element="h1" text="yourCart" />;
  };

  const renderEmpty = () => {
    const handleClick = () => {
      history.push("/checkout");
    };

    return (
      <div className="my-20">
        <TText element="h1" text="yourCart" />
        <Button text="goToCheckout" className="my-10" onClick={handleClick} />
      </div>
    );
  };

  const children = <div className="flex items-center justify-center">{renderEmpty()}</div>;

  return (
    <div className="w-full h-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
