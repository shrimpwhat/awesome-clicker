import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Themes = "light" | "dark" | "fire";

type State = {
  clicks: number;
  currentCombo: number;
  theme: {
    current: Themes;
    last: Omit<Themes, "fire">;
  };
};

type Actions = {
  handleClick: () => void;
  clearProgressBar: () => void;
  setTheme: (theme: Themes | Omit<Themes, "fire">) => void;
};

const getDefaultTheme = () => {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      clicks: 0,
      currentCombo: 0,
      theme: {
        ...(() => {
          const defaultTheme = getDefaultTheme();
          return {
            current: defaultTheme,
            last: defaultTheme,
          };
        })(),
      },

      handleClick: () =>
        set((state) => ({
          clicks: state.clicks + 1,
          currentCombo: state.currentCombo + 1,
        })),

      clearProgressBar: () => set({ currentCombo: 0 }),

      setTheme: (theme) =>
        set(({ theme: { current, last } }) => {
          return {
            theme: {
              current: theme as Themes,
              last: current === "fire" ? last : current,
            },
          };
        }),
    }),
    {
      name: "ac-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ clicks: state.clicks }),
    }
  )
);

export default useStore;
