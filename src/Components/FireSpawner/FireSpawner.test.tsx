import { act, render, screen } from "@testing-library/react";
import FireSpawner from "./FireSpawner";
import useStore from "../../store";

describe("Fire icons spawner", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<FireSpawner />);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should add one fire icon", () => {
    const { getState, setState } = useStore;
    setState({ currentCombo: 99 });

    act(() => {
      getState().handleClick();
    });

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should remove icon after 6 seconds", () => {
    const { getState, setState } = useStore;
    setState({ currentCombo: 99 });

    act(() => {
      getState().handleClick();
    });

    expect(screen.getByRole("img"));

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.queryByRole("img")).toBeNull();
  });

  test("should add and remove 10 icons after 6 seconds", () => {
    const { getState, setState } = useStore;
    setState({ currentCombo: 99 });

    act(() => {
      getState().handleClick();
    });

    expect(screen.getByRole("img"));

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.queryByRole("img")).toBeNull();

    for (let i = 0; i < 10; i++)
      act(() => {
        getState().handleClick();
      });

    expect(screen.getAllByRole("img")).toHaveLength(10);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
