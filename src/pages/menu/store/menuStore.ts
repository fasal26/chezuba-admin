import { create } from 'zustand';
import http from "@utils/axios";
import { IMenuStoreState } from './IMenuStore';

export const useMenuStore = create<IMenuStoreState>(() => ({
    createMenuAction: async (payload) => {
        try {
            return await http.post(import.meta.env.VITE_MENU_CREATE, payload);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    MenuListAction: async () => {
        try {
            return await http.get(import.meta.env.VITE_MENU_LIST);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    
}));