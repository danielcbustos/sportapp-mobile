import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import { SportsSpecialists } from "../pages/SportsSpecialists";
import { useSportsSpecialists } from "../hooks/useSportsSpecialists";

jest.mock("../hooks/useSportsSpecialists");

describe("SportsSpecialists component", () => {
  it("should render correctly with specialists", async () => {
    const mockSpecialists = [
      {
        productId: 1,
        name: "Specialist 1",
        picture: "especialist1.jpg",
      },
      {
        productId: 2,
        name: "Specialist 2",
        picture: "especialist2.jpg",
      },
    ];

    useSportsSpecialists.mockReturnValue({
      sportsSpecialist: mockSpecialists,
      loadSportsSpecialist: false,
      errorInSportsSpecialist: false,
      getSportsSpecialist: jest.fn(),
    });

    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByLabelText } = render(
      <SportsSpecialists
        navigation={navigation}
        route={{
          params: { selectedDate: "2024-04-30", formattedDate: "30-04-2024" },
        }}
      />
    );
  });

  it("should render correctly with no specialists", async () => {
    useSportsSpecialists.mockReturnValue({
      sportsSpecialist: [],
      loadSportsSpecialist: false,
      errorInSportsSpecialist: false,
      getSportsSpecialist: jest.fn(),
    });

    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, queryByLabelText } = render(
      <SportsSpecialists
        navigation={navigation}
        route={{
          params: { selectedDate: "2024-04-30", formattedDate: "30-04-2024" },
        }}
      />
    );

    expect(getByText("Por favor elige otra fecha")).toBeTruthy();
    expect(queryByLabelText("specialist")).toBeNull();
  });
});
