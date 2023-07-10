import { create } from "zustand"

interface AdoptionModalStore {
  isOpen: boolean
  open: () => void
  close: () => void
}

const useAdoptionModal = create<AdoptionModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export default useAdoptionModal
