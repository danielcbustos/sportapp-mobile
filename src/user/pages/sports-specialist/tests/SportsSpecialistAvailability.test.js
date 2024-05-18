import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SportsSpecialistAvailability } from "../pages/SportsSpecialistAvailability";

describe("SportsSpecialistAvailability component", () => {
  it("should render correctly", () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <SportsSpecialistAvailability navigation={navigation} />
    );

    expect(getByText("Disponibilidad")).toBeTruthy();
    expect(
      getByText(
        "Selecciona la fecha  y chequea la disponibilidad de nuestros deportologos"
      )
    ).toBeTruthy();

    expect(getByText("Ver disponibilidad")).toBeTruthy();
  });

  it("should handle button click with a selected date", async () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <SportsSpecialistAvailability navigation={navigation} />
    );
  });

  it("should handle button click without a selected date", async () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText } = render(
      <SportsSpecialistAvailability navigation={navigation} />
    );

    fireEvent.press(getByText("Ver disponibilidad"));

    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
