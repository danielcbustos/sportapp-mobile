import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { EventDetail } from "../pages/EventDetail";
import { useSuscribeEvents } from "../hooks/useSuscribeEvents";
import { store } from "../../../../../store/store";
import { Provider } from "react-redux";

// Mock the useSuscribeEvents hook
jest.mock("../hooks/useSuscribeEvents");

describe("EventDetail component", () => {
  it("should render correctly", () => {
    const navigation = { goBack: jest.fn() };
    const route = {
      params: {
        eventDetails: {
          productId: 1,
          name: "Event Name",
          cityId: 1,
          picture: "event-picture-url",
          startDateTime: "2024-04-30T10:00:00",
          endDateTime: "2024-04-30T12:00:00",
          description: "Event Description",
          category: { id: 1, name: "Category" },
          plan: { id: 1, name: "Plan" },
        },
        eventDate: "2024-04-30",
      },
    };

    // Mock the suscribeEvent function
    useSuscribeEvents.mockReturnValue({
      suscribeEvent: jest.fn(),
    });

    const { getByText } = render(
      <Provider store={store}>
        <EventDetail navigation={navigation} route={route} />
      </Provider>
    );

    expect(getByText("Reservar")).toBeTruthy();
  });

  it("should call suscribeEvent function when Reservar button is pressed", () => {
    const navigation = { goBack: jest.fn() };
    const route = {
      params: {
        eventDetails: {
          productId: 1,
          name: "Event Name",
          cityId: 1,
          picture: "event-picture-url",
          startDateTime: "2024-04-30T10:00:00",
          endDateTime: "2024-04-30T12:00:00",
          description: "Event Description",
          category: { id: 1, name: "Category" },
          plan: { id: 1, name: "Plan" },
        },
        eventDate: "2024-04-30",
      },
    };

    // Mock the suscribeEvent function
    const suscribeEventMock = jest.fn();
    useSuscribeEvents.mockReturnValue({
      suscribeEvent: suscribeEventMock,
    });

    const { getByText } = render(
      <Provider store={store}>
        <EventDetail navigation={navigation} route={route} />
      </Provider>
    );

    fireEvent.press(getByText("Reservar"));

    expect(suscribeEventMock).toHaveBeenCalled();
  });
});
