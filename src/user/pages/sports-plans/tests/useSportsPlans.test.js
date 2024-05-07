import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import { useSportsPlans } from "../hooks/useSportsPlans";

jest.mock("axios");

describe("useSportsPlans hook", () => {
  test("fetches sports plans successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Plan A" },
        { id: 2, name: "Plan B" },
      ],
    });

    const { result, waitForNextUpdate } = renderHook(() => useSportsPlans());

    act(() => {
      result.current.getSportsPlans();
    });

    await waitForNextUpdate();

    expect(result.current.loadMealPlans).toBe(false);
    expect(result.current.errorInMealPlans).toBe(false);
    expect(result.current.mealPlansByUser).toEqual([
      { id: 1, name: "Plan A" },
      { id: 2, name: "Plan B" },
    ]);
  });

  test("handles error when fetching sports plans", async () => {
    axios.post.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result, waitForNextUpdate } = renderHook(() => useSportsPlans());

    act(() => {
      result.current.getSportsPlans();
    });

    await waitForNextUpdate();

    expect(result.current.loadMealPlans).toBe(false);
    expect(result.current.errorInMealPlans).toBe(true);
  });
});
