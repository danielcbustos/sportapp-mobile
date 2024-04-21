import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useGoalTracking } from "../hooks/useGoalTracking";

jest.mock("axios");

describe("useGoalTracking", () => {
  test("should fetch goal tracking data successfully", async () => {
    const mockUserId = "mock-user-id";
    const mockGoalTrackingData = {};

    axios.get.mockResolvedValueOnce({ data: mockGoalTrackingData });

    const { result, waitForNextUpdate } = renderHook(() => useGoalTracking(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.goalTrackingLoading).toBe(true);

    await act(async () => {
      result.current.fetchGoalTracking(mockUserId);
      await waitForNextUpdate();
    });

    expect(result.current.goalTrackingLoading).toBe(false);
    expect(result.current.goalTracking).toEqual(mockGoalTrackingData);
  });
});
