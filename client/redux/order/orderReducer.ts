import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "models/order";

export type OrderRequest = {
  couponId?: string,
  contactId: string,
  addressId: string,
  cardId: string,
  orderDetails: OrderDetailRequest[],
}

export type OrderDetailRequest = {
  quantity: number,
  productId: string,
}

export type OrderRequestPayload = {
  request: OrderRequest,
  callback: (orderId: string) => void,
}

type OrderState = {
  loading: boolean;
  orderDetail?: Order,
}

const initialState: OrderState = {
  loading: false,
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state: OrderState, action: PayloadAction<OrderRequestPayload>): OrderState => ({
      ...state,
      loading: true,
    }),
    getOrderDetail: (state: OrderState, action: PayloadAction<string>): OrderState => ({
      ...state,
      loading: true,
    }),
    setOrderDetail: (state: OrderState, action: PayloadAction<Order>) => {
      const orderDetail = action.payload;

      return {
        ...state,
        loading: false,
        orderDetail,
      }
    },
  }
});

export const {
  createOrder, getOrderDetail, setOrderDetail,
} = OrderSlice.actions;


const OrderReducer = OrderSlice.reducer;

export default OrderReducer;
