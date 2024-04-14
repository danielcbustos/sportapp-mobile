import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Login } from "../pages/Login";
import { store } from "../../../store/store";
import sessionUserReducer, {
  setUserState,
  setDefaultUser,
  loginUser,
} from "../../../store/sessionUser/sessionUserSlice";

import { AlertNotification } from "../../utils/AlertNotification";

afterEach(() => {
  cleanup();
});
jest.mock("axios");
describe("<Login />", () => {
  test("renders 'Iniciar sesión' button", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const nuevoButton = screen.getByText("Iniciar sesión");
    expect(nuevoButton).toBeTruthy();
  });

  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(getByPlaceholderText("Correo")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();
  });
  test("setUserState action updates the user state correctly", () => {
    const user = {
      id: "1",
      userName: "testuser",
      email: "test@example.com",
      token: "xyz123",
      name: "Test",
      lastName: "User",
      role: "Admin",
    };
    const newState = sessionUserReducer(undefined, setUserState(user));
    expect(newState.userInfo).toEqual(user);
  });
  test("initial state is correct", () => {
    const initialState = sessionUserReducer(undefined, {});
    expect(initialState).toEqual({
      userInfo: {
        id: "",
        userName: "",
        email: "",
        token: "",
        name: "",
        lastName: "",
        role: "Visitante",
      },
    });
  });
  test("setDefaultUser action sets the user state to default", () => {
    const user = {
      id: "1",
      userName: "testuser",
      email: "test@example.com",
      token: "xyz123",
      name: "Test",
      lastName: "User",
      role: "Admin",
    };

    const stateWithUser = { userInfo: user };
    const newState = sessionUserReducer(stateWithUser, setDefaultUser());
    expect(newState.userInfo).toEqual({
      id: "",
      userName: "",
      email: "",
      token: "",
      name: "",
      lastName: "",
      role: "Visitante",
    });
  });
  test("loginUser action updates the user state correctly", () => {
    const user = {
      id: "1",
      userName: "testuser",
      email: "test@example.com",
      token: "xyz123",
      name: "Test",
      lastName: "User",
      role: "Admin",
    };
    const newState = sessionUserReducer(undefined, loginUser(user));
    expect(newState.userInfo).toEqual(user);
  });
  test("showToastSuccess displays a success toast", () => {
    const mockToastShow = jest.fn();
    const alertNotification = AlertNotification({
      showToastSuccess: mockToastShow,
      showToastError: jest.fn(),
      showDialogSuccess: jest.fn(),
      showDialogError: jest.fn(),
    });
    alertNotification.showToastSuccess("Success", "This is a success message");
  });
  test("should submit login form", async () => {
    const mockLoginUser = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailInput = getByPlaceholderText("Correo");
    const passwordInput = getByPlaceholderText("Contraseña");
    const submitButton = getByText("Iniciar sesión");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password");

    fireEvent.press(submitButton);
  });
});
