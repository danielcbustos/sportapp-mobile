import React from "react";
import { render } from "@testing-library/react-native";
import { ExternalAppInformation } from "../pages/ExternalAppInformation";

describe("ExternalAppInformation component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<ExternalAppInformation />);
    expect(getByText("Pasos")).toBeTruthy();
    expect(getByText("Sueño")).toBeTruthy();
    expect(getByText("Frecuencia Cardiaca")).toBeTruthy();
    expect(getByText("Chequear")).toBeTruthy();
  });
});
