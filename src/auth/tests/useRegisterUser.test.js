import axios from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import useRegisterUser from "../hooks/useRegisterUser";

jest.mock("axios");

describe("useRegisterUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register user successfully", async () => {
    const mockShowToastSuccess = jest.fn();
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "password",
    };
    axios.post.mockResolvedValueOnce({ data: newUser });

    const { result, waitForNextUpdate } = renderHook(() => useRegisterUser());

    await act(async () => {
      result.current.createUser(newUser);
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.userCreated).toBe(true);
  });

  test("should handle registration error", async () => {
    const mockShowToastError = jest.fn();
    const newUser = {
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "password",
    };
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));

    const { result, waitForNextUpdate } = renderHook(() => useRegisterUser());

    await act(async () => {
      result.current.createUser(newUser);
      await waitForNextUpdate();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.userCreated).toBe(false);
  });
});
