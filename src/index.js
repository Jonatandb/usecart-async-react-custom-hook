import { StrictMode } from "react";
import ReactDOM from "react-dom";
import OrderSummaryExample from "./components/OrderSummaryExample";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <OrderSummaryExample />
  </StrictMode>,
  rootElement
);
