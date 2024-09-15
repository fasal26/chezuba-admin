import { IResponse } from "@shared/types"

export interface IMenuStoreState {
  createMenuAction: (payload: any) => Promise<IResponse<any>>
  menuListAction: () => Promise<IResponse<any>>
  menuDetailsAction: (payload: any) => Promise<IResponse<any>>
  updateMenuAction: (payload: any) => Promise<IResponse<any>>
  updateMenuStatusAction: (payload: any) => Promise<IResponse<any>>
}