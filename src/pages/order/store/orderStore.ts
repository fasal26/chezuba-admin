import { create } from 'zustand';
import http from "@utils/axios";
import { IOrderStoreState } from './IOrderStore';

export const useOrderStore = create<IOrderStoreState>((set,get) => ({
  orderList: [],
  orderListAction: async () => {
    try {
      const response =  await http.get(import.meta.env.VITE_ORDER_LIST);
      if(response?.data) set({ orderList: response?.data })
      return response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  startOrderAction: async (payload) => {
    try {
      const response =  await http.patch(import.meta.env.VITE_ORDER_START, payload);
      return response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  completeOrderAction: async (payload) => {
    try {
      const response =  await http.patch(import.meta.env.VITE_ORDER_COMPLETE, payload);
      return response
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  updateOrderItems: (payload) => {
    let orders = [...get().orderList]
    orders.push(payload)
    set({ orderList: orders })
  }
}));