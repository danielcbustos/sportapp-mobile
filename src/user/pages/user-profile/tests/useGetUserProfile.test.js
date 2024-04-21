import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useGetUserProfile } from "../hooks/useGetUserProfile";

jest.mock("axios");

describe("useGetUserProfile", () => {
  test("should fetch user profile successfully", async () => {
    const mockUserId = "mock-user-id";
    const mockUserProfile = {
      userId: mockUserId,
    };
    axios.get.mockResolvedValueOnce({ data: mockUserProfile });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetUserProfile(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current.userProfile).toBeUndefined();
    expect(result.current.getUserLoading).toBe(true);

    await act(async () => {
      result.current.fetchUserProfile();
      await waitForNextUpdate();
    });

    expect(result.current.getUserLoading).toBe(false);
  });

  test("should handle error when fetching user profile", async () => {
    const errorMessage = "Failed to fetch user profile";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(
      () => useGetUserProfile(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current.userProfile).toBeUndefined();
    expect(result.current.getUserLoading).toBe(true);

    await act(async () => {
      result.current.fetchUserProfile();
      await waitForNextUpdate();
    });

    expect(result.current.userProfile).toBeUndefined();
    expect(result.current.getUserLoading).toBe(false);
  });
});
