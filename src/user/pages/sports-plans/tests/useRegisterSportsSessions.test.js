import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { useRegisterSportsSessions } from "../hooks/useRegisterSportsSessions";
import { store } from "../../../../../store/store";

jest.mock("axios");

describe("useRegisterSportsSessions", () => {
  test("should handle error when registering sports sessions", async () => {
    const mockNavigation = {};
    const mockTotalTimeExcercise = 60;
    const mockTotalCalories = 300;
    const mockFtp = 200;

    axios.post.mockRejectedValueOnce(new Error("Failed to register"));

    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () => useRegisterSportsSessions(mockNavigation),
      { wrapper }
    );

    jest.spyOn(store, "getState").mockReturnValueOnce({
      user: {
        userName: "John Doe",
        userId: "mock-user-id",
      },
    });

    await act(async () => {
      await result.current.registerSportsSessions(
        mockTotalTimeExcercise,
        mockTotalCalories,
        mockFtp
      );
    });
  });
});
