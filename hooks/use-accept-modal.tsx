import { create } from "zustand"

interface AcceptModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useAcceptModal = create<AcceptModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useAcceptModal
