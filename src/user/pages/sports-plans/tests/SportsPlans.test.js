import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import { SportsPlans } from "../pages/SportsPlans";
import { useSportsPlans } from "../hooks/useSportsPlans";

jest.mock("../hooks/useSportsPlans");

describe("SportsPlans component", () => {
  test("renders correctly", async () => {
    // Mock data for useSportsPlans hook
    const mockMealPlans = [
      {
        productId: 1,
        description: "Plan A",
        picture: "http://example.com/planA.jpg",
      },
      {
        productId: 2,
        description: "Plan B",
        picture: "http://example.com/planB.jpg",
      },
    ];

    // Mock the implementation of useSportsPlans hook
    useSportsPlans.mockReturnValueOnce({
      mealPlansByUser: mockMealPlans,
      loadMealPlans: false,
      errorInMealPlans: false,
      getSportsPlans: jest.fn(),
    });

    const { getByText, findByA11yLabel } = render(
      <SportsPlans navigation={{ goBack: jest.fn() }} />
    );

    expect(getByText("Rutinas Deportivas")).toBeTruthy();
    expect(getByText("Plan A")).toBeTruthy();
    expect(getByText("Plan B")).toBeTruthy();
  });
});
