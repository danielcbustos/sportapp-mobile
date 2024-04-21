import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useTypesOfNutrition } from "../hooks/useTypesOfNutrition";

jest.mock("axios");

describe("useTypesOfNutrition", () => {
    test("should fetch types of nutrition successfully", async () => {
        const mockTypesOfNutrition = [{ id: 1, name: "Proteins" }, { id: 2, name: "Carbohydrates" }];
        axios.get.mockResolvedValueOnce({ data: mockTypesOfNutrition });

        const { result, waitForNextUpdate } = renderHook(
            () => useTypesOfNutrition(),
            {
                wrapper: ({ children }) => (
                    <Provider store={store}>{children}</Provider>
                ),
            }
        );

        expect(result.current.typesOfNutrition).toEqual([]);
        expect(result.current.nutritionLoading).toBe(true);

        await act(async () => {
            result.current.fetchTypesOfNutrition();
            await waitForNextUpdate();
        });

        expect(result.current.typesOfNutrition).toEqual(mockTypesOfNutrition);
        expect(result.current.nutritionLoading).toBe(false);
    });

    test("should handle error when fetching types of nutrition", async () => {
        const errorMessage = "Failed to fetch types of nutrition";
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(
            () => useTypesOfNutrition(),
            {
                wrapper: ({ children }) => (
                    <Provider store={store}>{children}</Provider>
                ),
            }
        );

        expect(result.current.typesOfNutrition).toEqual([]);
        expect(result.current.nutritionLoading).toBe(true);

        await act(async () => {
            result.current.fetchTypesOfNutrition();
            await waitForNextUpdate();
        });

        expect(result.current.typesOfNutrition).toEqual([]);
        expect(result.current.nutritionLoading).toBe(false);
    });
});