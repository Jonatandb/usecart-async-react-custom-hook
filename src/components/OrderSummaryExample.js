import React, { useEffect, useState } from "react";
import useCart from "../hooks/useCart";
import "../styles.css";

const OrderSummaryExample = () => {
  const { confirmCheckout, processing, data } = useCart();
  const [errorCheckoutMessage, setErrorCheckoutMessage] = useState();
  const [checkoutReadyMessage, setCheckoutReadyMessage] = useState();

  const defaultButtonMessage = "Proceed to checkout!";
  const [buttonText, setButtonText] = useState(defaultButtonMessage);

  useEffect(() => {
    console.log(
      "OrderSummaryExample -> Se da cuenta de que data cambió:",
      data,
      Date.now()
    );
  }, [data]);

  useEffect(() => {
    console.log(
      "OrderSummaryExample -> Se da cuenta de que processing cambió:",
      processing,
      Date.now()
    );
  }, [processing]);

  const hacerAlgoAsync = async () => {
    setErrorCheckoutMessage();
    setCheckoutReadyMessage();
    setButtonText("Validating stock...");

    const result = await confirmCheckout();

    //
    //
    // Something very interesting here!:
    //
    //  data is not updated yet
    //  But the "result" object yes, it's updated.
    //
    //

    console.log(
      "Response: ",
      JSON.stringify(result, null, 2),
      { processing, data },
      Date.now()
    );

    if (!result.readyToCheckout) {
      // Ó hacer cualquier otra cosa cuando haya un error...
      switch (result.errorCode) {
        case "PRODUCT_MISSING_QTY": //  1|2 - No quantity selected'
        case "PRODUCT_OUT_OF_STOCK": //  3|4 - Product out of stock'
        case "PRODUCT_OUTDATED": //  5   - Product 1 only 2 items left'
          setErrorCheckoutMessage(result.details[0].message);
          break;
        default:
          console.error("Invalid errorCode:", result.errorCode);
          setErrorCheckoutMessage(result.errorCode);
          break;
      }
      setButtonText(defaultButtonMessage);
    } else {
      // Todo bien!
      setButtonText(defaultButtonMessage);
      setCheckoutReadyMessage(result.details[0].message);
      // window.open('https://www.google.com', 'CheckoutPage')
    }
  };

  return (
    <div className="wrapper">
      <small className="debugLeyend">
        (Check the console for debug details)
      </small>
      <button
        className={`${processing ? "actionButtonDisabled" : "actionButton"}`}
        onClick={hacerAlgoAsync}
        disabled={processing}
      >
        {buttonText}
      </button>
      {errorCheckoutMessage && (
        <h3 className="errorMessage">{errorCheckoutMessage}</h3>
      )}
      {checkoutReadyMessage && (
        <h3 className="successMessage">{checkoutReadyMessage}</h3>
      )}
    </div>
  );
};

export default OrderSummaryExample;
