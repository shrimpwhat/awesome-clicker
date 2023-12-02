import { act, fireEvent, render, screen } from "@testing-library/react";
import Clicker from "../src/Components/Main";
import useStore from "../src/store";

describe("Click button and total clicks", () => {
  test("should increment total clicks by 1", () => {
    const { container } = render(<Clicker />);
    const { getState } = useStore;

    const totalClicks = container.querySelector(".clicker__clicksValue")!;
    const clickBtn = screen.getByText("Click");

    expect(totalClicks).toHaveTextContent("0");

    act(() => {
      fireEvent.click(clickBtn);
    });

    expect(totalClicks).toHaveTextContent("1");
    expect(getState().currentCombo).toBe(1);
  });
});
