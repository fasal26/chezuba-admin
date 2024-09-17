import { IResponse } from "@shared/types"

export interface IMenuStoreState {
  createMenuAction: (payload: IMenuPayload) => Promise<IResponse<{}>>
  menuListAction: () => Promise<IResponse<IMenuItem[]>>
  menuDetailsAction: (payload: IMenuDetailPayload) => Promise<IResponse<IMenuItem>>
  updateMenuAction: (payload: IMenuItem) => Promise<IResponse<{}>>
  updateMenuStatusAction: (payload: IMenuUpdateStatusPayload) => Promise<IResponse<{}>>
}

export interface IMenuItem {
  MENU_NAME: string;
  DESCRIPTION: string;
  PRICE: number;
  PREP_TIME: number;
  SIZE: string;
  STATUS?: boolean;
  TYPE: string;
  MENU_ID: string;
  IMAGE?: string;
}

export interface IMenuPayload extends Omit<IMenuItem, 'MENU_ID' | 'STATUS'> {
}
export interface IMenuDetailPayload extends Pick<IMenuItem, 'MENU_ID'> {
}
export interface IMenuUpdateStatusPayload extends Pick<IMenuItem, 'MENU_ID' | 'STATUS'> {
}
