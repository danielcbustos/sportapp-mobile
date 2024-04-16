// import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useLogin from "../hooks/useLogin";

jest.mock("axios");
describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should log in user successfully", async () => {
    const mockShowToastError = jest.fn();
    const newLogin = { email: "test@example.com", password: "password" };
    axios.post.mockRejectedValueOnce(new Error("Login failed"));
    // const { result, waitForNextUpdate } = renderHook(() => useLogin());
  });
});
