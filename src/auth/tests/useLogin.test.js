import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useLogin from "../hooks/useLogin";

jest.mock("axios");
describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should log in user successfully", async () => {
    const mockProductServicesData = [
      { email: "test@example.com", password: "password" },
    ];

    axios.post.mockResolvedValueOnce({ data: mockProductServicesData });
  });
});
