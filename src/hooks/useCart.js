import { useEffect, useState } from "react";

const API_FAKE_DELAY_SECONDS = 1;

const useCart = () => {
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    console.log(
      "useCart() -> Se da cuenta de que data cambió:",
      data,
      Date.now()
    );
  }, [data]);

  useEffect(() => {
    console.log(
      "useCart() -> Se da cuenta de que processing cambió:",
      processing,
      Date.now()
    );
  }, [processing]);

  const confirmCheckout = async () => {
    console.clear();
    console.log(
      "useCart() -> confirmCheckout() -> Setting processing true",
      Date.now()
    );
    setProcessing(true);
    return new Promise((res, rej) => {
      setTimeout(() => {
        const random = Math.floor(Math.random() * 10) + 1;

        let readyToCheckout = false;
        let errorCode = null;
        const details = [];

        if (random > 5) {
          readyToCheckout = true;
        } else if (random <= 2) {
          errorCode = "PRODUCT_MISSING_QTY";
          details.push({ productId: 1, message: "1|2 - No quantity selected" });
        } else if (random <= 4) {
          errorCode = "PRODUCT_OUT_OF_STOCK";
          details.push({ productId: 1, message: "3|4 - Product out of stock" });
        } else {
          errorCode = "PRODUCT_OUTDATED";
          details.push({
            productId: 1,
            message: "5 - Product 1 only 2 items left"
          });
        }

        if (readyToCheckout) {
          details.push({
            productId: 1,
            message: "All good! - Ready to checkout"
          });
        }

        const result = {
          readyToCheckout,
          errorCode,
          details
        };

        console.log(
          "useCart() -> confirmCheckout() -> Setting processing false",
          Date.now()
        );
        setProcessing(false);

        console.log(
          "useCart() -> confirmCheckout() -> Setting data",
          Date.now()
        );
        setData(result);

        console.log(
          "useCart() -> confirmCheckout() -> Returning result",
          Date.now(),
          { processing },
          { data, result }
        );
        res(result);
      }, API_FAKE_DELAY_SECONDS * 1000);
    });
  };

  return {
    confirmCheckout,
    processing,
    data
  };
};

export default useCart;
