import { IResponse } from "@shared/types"

export interface IOrderStoreState {
  orderList: any
  orderListAction: () => Promise<IResponse<any>>,
  updateOrderItems: (payload: any) => void,
  startOrderAction: (payload: any) => Promise<IResponse<any>>,
  completeOrderAction: (payload: any) => Promise<IResponse<any>>
}