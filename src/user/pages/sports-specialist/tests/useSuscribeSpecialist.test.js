import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useSuscribeSpecialist } from "../hooks/useSuscribeSpecialist";

jest.mock("axios");

describe("useSuscribeSpecialist.test", () => {
  it("should subscribe to specialists successfully", async () => {
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

    const { result } = renderHook(() => useSuscribeSpecialist(mockNavigation), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const mockEvent = {
      productId: 1,
      name: "Specialist 1",
    };

    await act(async () => {
      await result.current.suscribeSpecialist(mockEvent);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("UserHome");
    expect(result.current.specialistSuscription).toBe(false);
  });

  it("should handle subscription error", async () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };

    const mockError = new Error("Subscription error");

    axios.post.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useSuscribeSpecialist(mockNavigation), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    const mockEvent = {
      productId: 1,
      name: "Specialist 1",
    };

    await act(async () => {
      await result.current.suscribeSpecialist(mockEvent);
    });

    expect(mockNavigation.navigate).not.toHaveBeenCalled();
    expect(result.current.specialistSuscription).toBe(false);
  });
});
