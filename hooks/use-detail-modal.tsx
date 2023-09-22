import { create } from "zustand"

interface DetailModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useDetailModal = create<DetailModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useDetailModal
