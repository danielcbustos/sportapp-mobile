import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useUpdateMealProfile } from "../hooks/useUpdateMealProfile";

jest.mock("axios");

describe("useUpdateMealProfile", () => {
  test("should update meal profile successfully", async () => {
    const mockToken = "mock-token";
    const mockUserId = "mock-user-id";
    const mockUpdatedUser = {
      userId: mockUserId,
    };

    axios.put.mockResolvedValueOnce({ data: mockUpdatedUser });

    const { result, waitForNextUpdate } = renderHook(
      () => useUpdateMealProfile(),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      }
    );

    expect(result.current.mealProfileLoading).toBe(false);
    expect(result.current.mealProfileUpdated).toBe(false);

    await act(async () => {
      result.current.updateMealProfile(mockUpdatedUser);
      await waitForNextUpdate();
    });

    expect(result.current.mealProfileLoading).toBe(false);
  });
});
