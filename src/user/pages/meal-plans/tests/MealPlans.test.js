import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import { Provider } from "react-redux";
import { MealPlans } from "../pages/MealPlans";
import { store } from "../../../../../store/store";

jest.mock("axios");

describe("MealPlans component", () => {
  test("renders correctly", async () => {
    const mockMealPlans = [
      { productId: 1, name: "Plan 1", picture: "http://example.com/plan1.jpg" },
      { productId: 2, name: "Plan 2", picture: "http://example.com/plan2.jpg" },
    ];
    axios.post.mockResolvedValueOnce({ data: mockMealPlans });

    const { getByText, findByA11yLabel } = render(
      <Provider store={store}>
        <MealPlans />
      </Provider>
    );

    expect(getByText("Cargando...")).toBeTruthy();

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(getByText("Plan 1")).toBeTruthy();
    expect(getByText("Plan 2")).toBeTruthy();
  });
});
