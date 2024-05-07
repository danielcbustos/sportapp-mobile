import React from "react";
import { render } from "@testing-library/react-native";
import { SportsPlansDetail } from "../pages/SportsPlansDetail";

describe("SportsPlansDetail component", () => {
  test("renders correctly", () => {
    const sportPlanDetails = {
      description: "Plan A",
      trainingPlan: {
        trainings: [
          {
            name: "Training 1",
            exercises: [
              {
                name: "Exercise 1",
                picture: "http://example.com/exercise1.jpg",
                sets: 3,
                repeats: 10,
              },
              {
                name: "Exercise 2",
                picture: "http://example.com/exercise2.jpg",
                sets: 4,
                repeats: 12,
              },
            ],
          },
          {
            name: "Training 2",
            exercises: [
              {
                name: "Exercise 3",
                picture: "http://example.com/exercise3.jpg",
                sets: 2,
                repeats: 8,
              },
              {
                name: "Exercise 4",
                picture: "http://example.com/exercise4.jpg",
                sets: 3,
                repeats: 15,
              },
            ],
          },
        ],
      },
    };

    const { getByText, getByTestId } = render(
      <SportsPlansDetail
        navigation={{ goBack: jest.fn() }}
        route={{ params: { sportPlanDetails } }}
      />
    );

    expect(getByText("Rutina Deportiva")).toBeTruthy();
    expect(getByText("Plan A")).toBeTruthy();
    expect(getByText("Training 1")).toBeTruthy();
    expect(getByText("Exercise 1")).toBeTruthy();
    expect(getByText("Exercise 2")).toBeTruthy();
    expect(getByText("Training 2")).toBeTruthy();
    expect(getByText("Exercise 3")).toBeTruthy();
    expect(getByText("Exercise 4")).toBeTruthy();
  });
});
