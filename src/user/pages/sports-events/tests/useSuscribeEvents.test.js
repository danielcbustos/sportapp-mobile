import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { useSuscribeEvents } from "../hooks/useSuscribeEvents";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";

jest.mock("axios");

describe("useSuscribeEvents", () => {
  it("should subscribe to events successfully", async () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const mockResponse = {
      data: {
        suscribed: true,
        message: "Subscription successful",
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useSuscribeEvents(mockNavigation), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const mockEvent = {
      productId: 1,
      name: "Event 1",
    };

    await act(async () => {
      await result.current.suscribeEvent(mockEvent);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("UserHome");
    expect(result.current.eventSuscription).toBe(false);
  });

  it("should handle subscription error", async () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const mockError = new Error("Subscription error");

    axios.post.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSuscribeEvents(mockNavigation), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const mockEvent = {
      productId: 1,
      name: "Event 1",
    };

    await act(async () => {
      await result.current.suscribeEvent(mockEvent);
    });

    expect(mockNavigation.navigate).not.toHaveBeenCalled();
    expect(result.current.eventSuscription).toBe(false);
  });
});
