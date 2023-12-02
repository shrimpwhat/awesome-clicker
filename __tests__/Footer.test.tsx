import { act, render } from "@testing-library/react";
import Footer from "../src/Components/Footer";
import useStore from "../src/store";

describe("Progress bar and time bar", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
      shouldClearNativeTimers: true,
    });
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should increment current combo and increase width of progress bar", () => {
    const { container } = render(<Footer />);
    const { getState } = useStore;

    const currentCombo = container.querySelector(
      ".progressBarGroup__progressValue"
    )!;
    const progressBar = container.querySelector(
      ".progressBarGroup__progressFlap"
    )!;
    expect(currentCombo).toHaveTextContent("0");
    expect(progressBar).toHaveStyle({ width: "100%" });

    act(() => {
      getState().handleClick();
    });
    expect(currentCombo).toHaveTextContent("1");
    expect(progressBar).toHaveStyle({ width: "99%" });
  });

  test("should reset current combo and progress bar width", () => {
    const { container } = render(<Footer />);
    const { getState } = useStore;

    const currentCombo = container.querySelector(
      ".progressBarGroup__progressValue"
    )!;
    const progressBar = container.querySelector(
      ".progressBarGroup__progressFlap"
    )!;
    expect(currentCombo).toHaveTextContent("0");
    expect(progressBar).toHaveStyle({ width: "100%" });

    act(() => {
      getState().handleClick();
    });
    expect(currentCombo).toHaveTextContent("1");
    expect(progressBar).toHaveStyle({ width: "99%" });

    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(currentCombo).toHaveTextContent("0");
    expect(progressBar).toHaveStyle({ width: "100%" });
  });

  test("should add timebar and remove it after click", () => {
    const { container } = render(<Footer />);
    const { getState } = useStore;

    const getTimebar = () => container.querySelector(".footer__timebar");
    expect(getTimebar()).toBeNull();

    act(() => {
      getState().handleClick();
    });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(getTimebar()).not.toBeNull();

    act(() => {
      getState().handleClick();
    });
    expect(getTimebar()).toBeNull();
  });
});
