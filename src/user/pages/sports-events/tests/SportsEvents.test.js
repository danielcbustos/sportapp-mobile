import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import axios from "axios";
import { useSportEvents } from "../hooks/useSportsEvents";
import { SportsEvents } from "../pages/SportsEvents";

jest.mock("../hooks/useSportsEvents");

describe("SportsEvents component", () => {
  it("should render correctly with events", async () => {
    const mockEvents = [
      {
        productId: 1,
        name: "Event 1",
        picture: "event1.jpg",
      },
      {
        productId: 2,
        name: "Event 2",
        picture: "event2.jpg",
      },
    ];

    useSportEvents.mockReturnValue({
      eventsByUser: mockEvents,
      loadEvents: false,
      errorInEvents: false,
      getEvents: jest.fn(),
    });

    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByLabelText } = render(
      <SportsEvents
        navigation={navigation}
        route={{
          params: { selectedDate: "2024-04-30", formattedDate: "30-04-2024" },
        }}
      />
    );
  });

  it("should render correctly with no events", async () => {
    useSportEvents.mockReturnValue({
      eventsByUser: [],
      loadEvents: false,
      errorInEvents: false,
      getEvents: jest.fn(),
    });

    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, queryByLabelText } = render(
      <SportsEvents
        navigation={navigation}
        route={{
          params: { selectedDate: "2024-04-30", formattedDate: "30-04-2024" },
        }}
      />
    );

    expect(getByText("Por favor elige otra fecha")).toBeTruthy();
    expect(queryByLabelText("event")).toBeNull();
  });
});
