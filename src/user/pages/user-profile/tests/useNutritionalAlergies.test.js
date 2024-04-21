import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useNutritionalAlergies } from "../hooks/useNutritionalAlergies";

jest.mock("axios");

describe("useNutritionalAlergies", () => {
  test("should fetch nutritional allergies successfully", async () => {
    const mockNutritionalAllergies = [
      { id: 1, name: "Gluten" },
      { id: 2, name: "Lactose" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockNutritionalAllergies });

    const { result, waitForNextUpdate } = renderHook(
      () => useNutritionalAlergies(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current.nutritionalAllergies).toEqual([]);
    expect(result.current.allergiesLoading).toBe(true);

    await act(async () => {
      result.current.fetchNutritionalAllergies();
      await waitForNextUpdate();
    });

    expect(result.current.nutritionalAllergies).toEqual(
      mockNutritionalAllergies
    );
    expect(result.current.allergiesLoading).toBe(false);
  });

  test("should handle error when fetching nutritional allergies", async () => {
    const errorMessage = "Failed to fetch nutritional allergies";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(
      () => useNutritionalAlergies(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current.nutritionalAllergies).toEqual([]);
    expect(result.current.allergiesLoading).toBe(true);

    await act(async () => {
      result.current.fetchNutritionalAllergies();
      await waitForNextUpdate();
    });

    expect(result.current.nutritionalAllergies).toEqual([]);
    expect(result.current.allergiesLoading).toBe(false);
  });
});
