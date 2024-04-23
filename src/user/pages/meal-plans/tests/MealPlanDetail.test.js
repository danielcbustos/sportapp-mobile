import React from "react";
import { render } from "@testing-library/react-native";
import { MealPlanDetail } from "../pages/MealPlanDetail";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";

describe("MealPlanDetail component", () => {
  test("renders correctly", () => {
    const mealPlanDetails = {
      name: "Plan 1",
      nutritionalPlan: {
        days: [
          {
            name: "Day 1",
            meals: [
              {
                dishType: "Breakfast",
                name: "Eggs",
                calories: 300,
                picture: "http://example.com/eggs.jpg",
              },
              {
                dishType: "Lunch",
                name: "Salad",
                calories: 200,
                picture: "http://example.com/salad.jpg",
              },
            ],
          },
        ],
      },
    };
    const { getByText } = render(
      <Provider store={store}>
        <MealPlanDetail route={{ params: { mealPlanDetails } }} />
      </Provider>
    );

    expect(getByText("Planes Alimenticios")).toBeTruthy();
  });
});
