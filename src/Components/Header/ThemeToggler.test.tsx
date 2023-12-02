import { render, screen, fireEvent, act } from "@testing-library/react";
import ThemeToggler from "./ThemeToggler";
import useStore from "../../store";

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
});
