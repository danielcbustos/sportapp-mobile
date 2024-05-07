import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useGetGoals } from "../hooks/useGetGoals";

jest.mock("axios");

describe("useGetGoals", () => {
  test("should fetch goals successfully", async () => {
    const mockGoals = [
      { id: 1, name: "Goal A" },
      { id: 2, name: "Goal B" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockGoals });

    const { result, waitForNextUpdate } = renderHook(() => useGetGoals(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.goal).toEqual([]);
    expect(result.current.goalLoading).toBe(true);

    await act(async () => {
      result.current.fetchGoals();
      await waitForNextUpdate();
    });

    expect(result.current.goal).toEqual(mockGoals);
    expect(result.current.goalLoading).toBe(false);
  });

  test("should handle error when fetching goals", async () => {
    const errorMessage = "Failed to fetch goals";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useGetGoals(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.goal).toEqual([]);
    expect(result.current.goalLoading).toBe(true);

    await act(async () => {
      result.current.fetchGoals();
      await waitForNextUpdate();
    });

    expect(result.current.goal).toEqual([]);
    expect(result.current.goalLoading).toBe(false);
  });
});
