import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import { useRegisterSportsSessions } from "../hooks/useRegisterSportsSessions";
import { RegisterSportsSessions } from "../pages/RegisterSportsSessions";
RegisterSportsSessions;

jest.mock("../hooks/useRegisterSportsSessions");

describe("RegisterSportsSessions component", () => {
  test("should render correctly", () => {
    useRegisterSportsSessions.mockReturnValue({
      registerSportsSessions: jest.fn(),
    });

    const { getByText, getByTestId } = render(<RegisterSportsSessions />);

    expect(getByText("Seguimiento")).toBeTruthy();
    expect(getByText("Actividad Fisica")).toBeTruthy();
    expect(getByTestId("start")).toBeTruthy();
  });

  test('should call registerSportsSessions when "Finalizar entrenamiento" button is pressed', () => {
    const mockNavigation = { goBack: jest.fn() };
    const mockRegisterSportsSessions = jest.fn();
    useRegisterSportsSessions.mockReturnValue({
      registerSportsSessions: mockRegisterSportsSessions,
    });

    const { getByText, getByTestId } = render(
      <RegisterSportsSessions navigation={mockNavigation} />
    );
    fireEvent.press(getByText("Finalizar entrenamiento"));

    expect(mockRegisterSportsSessions).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Number),
      expect.any(Number)
    );
  });
  test("should call resetStopwatch when 'Reiniciar' button is pressed", () => {
    const mockResetStopwatch = jest.fn();
    useRegisterSportsSessions.mockReturnValue({
      resetStopwatch: mockResetStopwatch,
    });

    const { getByText } = render(<RegisterSportsSessions />);
    fireEvent.press(getByText("Reiniciar"));
  });
  test("should call resumeStopwatch when 'Reanudar' button is pressed", () => {
    const mockResumeStopwatch = jest.fn();
    useRegisterSportsSessions.mockReturnValue({
      resumeStopwatch: mockResumeStopwatch,
    });

    const { getByText } = render(<RegisterSportsSessions />);
    fireEvent.press(getByText("Reanudar"));
  });
});
