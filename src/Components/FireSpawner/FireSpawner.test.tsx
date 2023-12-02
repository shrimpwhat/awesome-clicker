import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FireSpawner from "./FireSpawner";
import useStore from "../../store";

describe("Fire icons spawner", () => {
  test("should add one fire icon", async () => {
    const { getState, setState } = useStore;
    setState({ currentCombo: 99 });
    render(<FireSpawner />);

    act(() => {
      getState().handleClick();
    });

    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
});
