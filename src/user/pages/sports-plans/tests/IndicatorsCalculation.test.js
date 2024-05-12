import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { IndicatorsCalculation } from "../pages/IndicatorsCalculation";

describe("IndicatorsCalculation component", () => {
  test("renders correctly", () => {
    const propiedades = {
      totalTimeExcercise: "2",
      totalCalories: "500",
      ftp: "250",
    };

    const { getByText } = render(
      <Provider store={store}>
        <IndicatorsCalculation route={{ params: propiedades }} />
      </Provider>
    );

    expect(getByText("!Buen Trabajo!")).toBeTruthy();
    expect(getByText("Tiempo Total")).toBeTruthy();
    expect(getByText("N. Ejercicios")).toBeTruthy();
    expect(getByText("Total calorias")).toBeTruthy();
    expect(getByText("Intensidad")).toBeTruthy();
  });
});
