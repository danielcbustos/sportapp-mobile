import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { useMealPlans } from "../hooks/useMealPlans";

jest.mock("axios");

describe("useMealPlans", () => {
  test("should fetch meal plans successfully", async () => {
    const mockMealPlans = [
      { id: 1, name: "Plan 1" },
      { id: 2, name: "Plan 2" },
    ];
    axios.post.mockResolvedValueOnce({ data: mockMealPlans });

    const { result, waitForNextUpdate } = renderHook(() => useMealPlans());

    expect(result.current.mealPlansByUser).toEqual([]);
    expect(result.current.loadMealPlans).toBe(true);
    expect(result.current.errorInMealPlans).toBe(false);

    await act(async () => {
      result.current.getMealPlans("userId");
      await waitForNextUpdate();
    });

    expect(result.current.mealPlansByUser).toEqual(mockMealPlans);
    expect(result.current.loadMealPlans).toBe(false);
    expect(result.current.errorInMealPlans).toBe(false);
  });

  test("should handle error when fetching meal plans", async () => {
    const errorMessage = "Failed to fetch meal plans";
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useMealPlans());

    expect(result.current.mealPlansByUser).toEqual([]);
    expect(result.current.loadMealPlans).toBe(true);
    expect(result.current.errorInMealPlans).toBe(false);

    await act(async () => {
      result.current.getMealPlans("userId");
      await waitForNextUpdate();
    });

    expect(result.current.mealPlansByUser).toEqual([]);
    expect(result.current.loadMealPlans).toBe(false);
    expect(result.current.errorInMealPlans).toBe(true);
  });
});
