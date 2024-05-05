import React from "react";
import { render } from "@testing-library/react-native";
import { HeartRate } from "../pages/HeartRate";
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Icon",
}));
describe("HeartRate component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<HeartRate />);
    expect(getByText("Frecuencia Cardiaca")).toBeTruthy();
  });
});
