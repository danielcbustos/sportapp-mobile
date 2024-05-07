import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { UserProfile } from "../pages/UserProfile";

jest.mock("axios");
jest.mock("../hooks/useGetGenres", () => ({
  useGetGenres: jest.fn(() => ({
    genres: [
      { id: 1, name: "Male" },
      { id: 2, name: "Female" },
    ],
    genresLoading: false,
    fetchGenres: jest.fn(),
  })),
}));

describe("UserProfile component", () => {
  test("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <UserProfile navigation={{}} />
      </Provider>
    );
    expect(getByText("Cuentanos sobre ti")).toBeTruthy();
    expect(getByText("Continuar")).toBeTruthy();
    expect(getByText("Selecciona tu pais de origen")).toBeTruthy();
  });

  test("updates form values on change", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile navigation={{}} />
      </Provider>
    );

    const ageInput = getByTestId("input_age");
    fireEvent.changeText(ageInput, "25");

    expect(ageInput.props.value).toBe("25");
  });

  test("updates form values on change2", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile navigation={{}} />
      </Provider>
    );

    const weightInput = getByTestId("input_weight");
    fireEvent.changeText(weightInput, "65");

    expect(weightInput.props.value).toBe("65");
  });

  test("updates form values on change3", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile navigation={{}} />
      </Provider>
    );

    const input_heigthInput = getByTestId("input_heigth");
    fireEvent.changeText(input_heigthInput, "160");

    expect(input_heigthInput.props.value).toBe("160");
  });

  test("navigates to correct screen when continue button is pressed", () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <Provider store={store}>
        <UserProfile navigation={mockNavigation} />
      </Provider>
    );

    fireEvent.press(getByText("Continuar"));

    expect(mockNavigation.navigate).toHaveBeenCalledWith("SportsPlansProfile", {
      formData: {
        age: 0,
        country: "",
        genre: "",
        heigth: 0,
        weight: 0,
      },
    });
  });
  test("updates form values when selecting genre", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserProfile navigation={{}} />
      </Provider>
    );

    const genrePicker = getByTestId("web_picker_genre");

    fireEvent.press(genrePicker);
  });
});
