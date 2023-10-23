import { create } from "zustand";

type State = {
  clicks: number;
  barProgress: number;
};

type Actions = {
  handleClick: () => void;
  clearProgressBar: () => void;
};

const useStore = create<State & Actions>()((set) => ({
  clicks: 0,
  barProgress: 0,

  handleClick: () =>
    set((state) => ({
      clicks: state.clicks + 1,
      barProgress: state.barProgress + 1,
    })),
  clearProgressBar: () => set({ barProgress: 0 }),
}));

export default useStore;
