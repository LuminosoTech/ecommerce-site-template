import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useCart } from "@luminoso/react-ecommerce-sdk";

import { TText } from "../text/Text";
import { Badge } from "../badge/Badge";

import Search from "../../res/Search";
import ShoppingCart from "../../res/ShoppingCart";
import PersonOutine from "../../res/PersonOutine";
import Hamburger from "../../res/Hamburger";

export const Header = () => {
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  const history = useHistory();
  const cart = useCart();

  useEffect(() => {
    const fetchNumberOfProducts = async () => {
      if (cart) {
        const sessionCart = await cart.getCart();
        setNumberOfProducts(sessionCart.products.length);
      }
    };
    fetchNumberOfProducts();
  }, [cart]);

  const renderRight = useMemo(() => {
    const iconButtonClassNames = "p-3 fill-primary";
    const iconClassNames = "w-6 h-6 fill-primary";

    const handleCartClick = () => {
      history.push("/cart");
    };

    return (
      <div className="flex">
        <button className={`${iconButtonClassNames}`}>
          <Search className={`${iconClassNames} `} />
        </button>
        <button className={`${iconButtonClassNames}`}>
          <PersonOutine className={`${iconClassNames}`} />
        </button>
        <button className={`${iconButtonClassNames}`} onClick={handleCartClick}>
          <Badge content={numberOfProducts}>
            <ShoppingCart className={`${iconClassNames}`} />
          </Badge>
        </button>
        <button className={`${iconButtonClassNames}`}>
          <Hamburger className={`${iconClassNames}`} />
        </button>
      </div>
    );
  }, [history, numberOfProducts]);

  return (
    <header className="flex flex-col items-center justify-between w-full">
      <div className="flex items-center justify-center w-full p-3 shadow-md bg-gray-50">
        <TText text="landingBannerText" className="text-base text-center text-black" />
      </div>
      <div className="flex items-center justify-between w-full p-3">
        <div>
          {/* <img
            className="js lazyautosizes lazyloaded"
            src="//cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_300x300.png?v=1556646345"
            data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
            data-aspectratio="0.7727961223871554"
            data-sizes="auto"
            alt="Hudson Soap Co."
            style={{ maxWidth: 150 }}
            data-srcset="//cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_180x.png?v=1556646345 180w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_360x.png?v=1556646345 360w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_540x.png?v=1556646345 540w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_720x.png?v=1556646345 720w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_900x.png?v=1556646345 900w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1080x.png?v=1556646345 1080w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1296x.png?v=1556646345 1296w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1512x.png?v=1556646345 1512w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1728x.png?v=1556646345 1728w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_2048x.png?v=1556646345 2048w"
            sizes="150px"
            srcSet="//cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_180x.png?v=1556646345 180w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_360x.png?v=1556646345 360w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_540x.png?v=1556646345 540w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_720x.png?v=1556646345 720w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_900x.png?v=1556646345 900w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1080x.png?v=1556646345 1080w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1296x.png?v=1556646345 1296w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1512x.png?v=1556646345 1512w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_1728x.png?v=1556646345 1728w, //cdn.shopify.com/s/files/1/0068/9845/0499/files/HSC_logo_1PP_2048x.png?v=1556646345 2048w"
          /> */}
        </div>
        {renderRight}
      </div>
    </header>
  );
};
