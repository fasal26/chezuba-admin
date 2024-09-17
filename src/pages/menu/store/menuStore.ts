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
    menuListAction: async () => {
        try {
            return await http.get(import.meta.env.VITE_MENU_LIST);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    menuDetailsAction: async (payload) => {
        try {
            return await http.get(import.meta.env.VITE_MENU_DETAILS, { params: payload });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    updateMenuAction: async (payload) => {
        try {
            return await http.put(import.meta.env.VITE_MENU_CREATE, payload);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    updateMenuStatusAction: async (payload) => {
        try {
            return await http.patch(import.meta.env.VITE_MENU_UPDATE_STATUS, payload);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },
    
}));