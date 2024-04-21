import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import axios from "axios";
import { Provider } from "react-redux";
import { Progress } from "../pages/Progress";
import { store } from "../../../../../store/store";
jest.mock("axios");
describe("Progress component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Progress />
      </Provider>
    );
    expect(getByText("Progreso")).toBeTruthy();
    expect(getByText("Actualizar")).toBeTruthy();
  });
});
