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

type PersistedState =
  | {
      clicks: number;
      theme: {
        current: Themes;
        last: Omit<Themes, "fire">;
      };
    }
  | undefined;

const getDefaultTheme = () => {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const handleBodyTheme = (
  last: Themes | Omit<Themes, "fire">,
  current: Themes | Omit<Themes, "fire">
) => {
  document.body.classList.remove(`theme-${last}`);
  document.body.classList.add(`theme-${current}`);
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

      clearProgressBar: () => {
        set((state) => {
          const newState = {
            currentCombo: 0,
            theme: {
              current:
                state.currentCombo >= 100
                  ? (state.theme.last as Themes)
                  : state.theme.current,
              last: state.theme.last,
            },
          };
          handleBodyTheme("fire", newState.theme.current);
          return newState;
        });
      },

      setTheme: (theme) =>
        set(({ theme: { current, last } }) => {
          handleBodyTheme(current, theme);
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
      partialize: (state) => ({
        clicks: state.clicks,
        theme: { current: state.theme.current, last: state.theme.last },
      }),
      merge: (persistedState, currentState) => {
        const tempState = persistedState as PersistedState;

        let currentTheme = currentState.theme.current;
        if (tempState)
          currentTheme =
            tempState.theme.current === "fire"
              ? (tempState.theme.last as Themes)
              : tempState.theme.current;

        currentState.theme.current = currentTheme;
        currentState.clicks = tempState?.clicks ?? currentState.clicks;
        document.body.classList.add(`theme-${currentTheme}`);
        return currentState;
      },
    }
  )
);

export default useStore;
