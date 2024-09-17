import { IResponse } from "@shared/types"

export interface IOrderStoreState {
  orderList: IOrder[]
  orderListAction: () => Promise<IResponse<IOrder[]>>,
  updateOrderItems: (payload: ISocketPayload) => void,
  startOrderAction: (payload: IOrderStatusPayload) => Promise<IResponse<{}>>,
  completeOrderAction: (payload: IOrderStatusPayload) => Promise<IResponse<{}>>
}
export interface IOrder {
  ITEMS: IOrderItem[];
  AMOUNT: number;
  STATUS: string;
  DATE: string;
  ORDER_ID: string;
  PREP_TIME: number;
}

export interface IOrderItem {
  MENU_ID: string;
  QUANTITY: number;
  PRICE: number;
  TOTAL: number;
}

export interface IOrderStatusPayload extends Pick<IOrder, 'ORDER_ID'> {
}

export interface ISocketPayload {
  payload: IOrder
}
