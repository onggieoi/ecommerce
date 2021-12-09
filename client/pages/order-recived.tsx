import React, { useEffect } from "react";
import Head from "next/head";
import OrderRecivedPage from "containers/OrderReceived/OrderReceived";
import { useAppDispatch, useAppSelector } from "helper/hooks";
import { useRouter } from "next/router";
import { getOrderDetail } from "redux/order/orderReducer";
import InlineLoader from "components/InlineLoader";

const OrderRecived = () => {
  const { query } = useRouter();
  const { loading, orderDetail } = useAppSelector(state => state.orderReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (query.orderId) {
      dispatch(getOrderDetail(query.orderId.toString()));
    }

  }, [query]);

  if (loading && !orderDetail) {
    return (<div>Loading...</div>)
  }

  return (
    <>
      <Head>
        <title>Invoice - SNKR</title>
      </Head>
      {loading && <InlineLoader />}

      {orderDetail && <OrderRecivedPage orderDetail={orderDetail} />}
    </>
  );
}

export default OrderRecived;
