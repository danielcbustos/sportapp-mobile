import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { SignUp } from "../pages/SignUp";

afterEach(() => {
  cleanup();
});

jest.mock("axios");
describe("<Sign Up />", () => {
  test("renders 'Registrar' button", () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const nuevoButton = screen.getByText("Registrar");
    expect(nuevoButton).toBeTruthy();
  });

  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    expect(getByPlaceholderText("Nombres")).toBeTruthy();
    expect(getByPlaceholderText("Apellidos")).toBeTruthy();
  });

  test("should submit signup form", async () => {
    const mockRegisterUser = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const firstNameInput = getByPlaceholderText("Nombres");
    const lastNameInput = getByPlaceholderText("Apellidos");
    const emailInput = getByPlaceholderText("Correo");
    const passwordInput = getByPlaceholderText("Contraseña");
    const confirmPassword = getByPlaceholderText("Confirmar Contraseña");
    const submitButton = getByText("Registrar");

    fireEvent.changeText(firstNameInput, "daniel");
    fireEvent.changeText(lastNameInput, "rodriguez");
    fireEvent.changeText(emailInput, "testt@example.com");
    fireEvent.changeText(passwordInput, "Passw123*");
    fireEvent.changeText(confirmPassword, "Passw123*");

    fireEvent.press(submitButton);
  });
});
