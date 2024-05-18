import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { store } from "../../../../../store/store";
import { Provider } from "react-redux";
import { SportsSpecialistDetail } from "../pages/SportsSpecialistDetail";
import { useSuscribeSpecialist } from "../hooks/useSuscribeSpecialist";

jest.mock("../hooks/useSuscribeSpecialist");

describe("SportsSpecialistDetail component", () => {
  it("should render correctly", () => {
    const navigation = { goBack: jest.fn() };
    const route = {
      params: {
        specialistDetails: {
          productId: 1,
          name: "Specialist Name",
          cityId: 1,
          picture: "specialist-picture-url",
          startDateTime: "2024-04-30T10:00:00",
          endDateTime: "2024-04-30T12:00:00",
          description: "Specialist Description",
          category: { id: 1, name: "Category" },
          plan: { id: 1, name: "Plan" },
        },
        specialistDate: "2024-04-30",
      },
    };

    useSuscribeSpecialist.mockReturnValue({
      suscribeSpecialist: jest.fn(),
    });

    const { getByText } = render(
      <Provider store={store}>
        <SportsSpecialistDetail navigation={navigation} route={route} />
      </Provider>
    );

    expect(getByText("Reservar")).toBeTruthy();
  });

  it("should call suscribeSpecialist function when Reservar button is pressed", () => {
    const navigation = { goBack: jest.fn() };
    const route = {
      params: {
        specialistDetails: {
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
        specialistDate: "2024-04-30",
      },
    };

    // Mock the suscribeEvent function
    const suscribeSpecialistMock = jest.fn();
    useSuscribeSpecialist.mockReturnValue({
      suscribeSpecialist: suscribeSpecialistMock,
    });

    const { getByText } = render(
      <Provider store={store}>
        <SportsSpecialistDetail navigation={navigation} route={route} />
      </Provider>
    );

    fireEvent.press(getByText("Reservar"));

    expect(suscribeSpecialistMock).toHaveBeenCalled();
  });
});
