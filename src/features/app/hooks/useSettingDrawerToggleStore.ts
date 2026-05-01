import { create } from 'zustand'

interface DrawerStore{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
export const useSettingDrawerToggleStore = create<DrawerStore>((set) => ({
  isOpen: false,
  setIsOpen: (open: boolean) => set({ isOpen: open }),
}))
