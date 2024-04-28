import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { EventAvailability } from "../pages/EventAvailability";
describe("EventAvailability component", () => {
  it("should render correctly", () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <EventAvailability navigation={navigation} />
    );

    expect(getByText("Disponibilidad")).toBeTruthy();
    expect(
      getByText("Selecciona la fecha  y chequea que eventos deportivos hay")
    ).toBeTruthy();

    expect(getByText("Ver disponibilidad")).toBeTruthy();
  });

  it("should handle button click with a selected date", async () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <EventAvailability navigation={navigation} />
    );
  });

  it("should handle button click without a selected date", async () => {
    const navigation = { goBack: jest.fn(), navigate: jest.fn() };

    const { getByText } = render(<EventAvailability navigation={navigation} />);

    fireEvent.press(getByText("Ver disponibilidad"));

    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
