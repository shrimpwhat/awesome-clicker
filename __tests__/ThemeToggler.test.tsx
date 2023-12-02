import { render, screen, fireEvent, act } from "@testing-library/react";
import ThemeToggler from "../src/Components/Header/ThemeToggler";
import useStore from "../src/store";

describe("ThemeToggler", () => {
  test("should toggle the theme when clicked", () => {
    const { setState } = useStore;

    setState({ theme: { current: "light", last: "light" } });

    render(<ThemeToggler />);

    const toggleButton = screen.getByRole("button");

    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(document.body.className).toBe("theme-dark");

    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(document.body.className).toBe("theme-light");
  });

  test("should toggle fire theme and toggle back", () => {
    const { getState, setState } = useStore;
    render(<ThemeToggler />);
    setState({ currentCombo: 99 });
    expect(document.body.className).toBe("theme-light");

    const toggleButton = screen.getByRole("button");
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(document.body.className).toBe("theme-dark");

    act(() => {
      getState().handleClick();
    });
    expect(document.body.className).toBe("theme-fire");

    act(() => {
      getState().clearProgressBar();
    });
    expect(document.body.className).toBe("theme-dark");
  });
});
