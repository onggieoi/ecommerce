import React from "react";
import Head from "next/head";
import OrderRecivedPage from "containers/OrderReceived/OrderReceived";

class OrderRecived extends React.Component<any> {
  public render() {
    return (
      <>
        <Head>
          <title>Invoice - PickBazar</title>
        </Head>
        <OrderRecivedPage />
      </>
    );
  }
}

export default OrderRecived;
