import { IResponse } from "@shared/types"

export interface IMenuStoreState {
  createMenuAction: (payload: any) => Promise<IResponse<any>>
  MenuListAction: () => Promise<IResponse<any>>
}