import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { useSportEvents } from "../hooks/useSportsEvents";

jest.mock("axios");

describe("useSportEvents", () => {
  it("should fetch events successfully", async () => {
    const mockResponse = [
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ];

    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() => useSportEvents());

    const selectedDate = "2024-04-27";

    await act(async () => {
      result.current.getEvents(selectedDate);
      await waitForNextUpdate();
    });

    expect(result.current.loadEvents).toBe(false);
    expect(result.current.errorInEvents).toBe(false);
    expect(result.current.eventsByUser).toEqual(mockResponse);
  });

  it("should handle fetch events error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Server error"));

    const { result, waitForNextUpdate } = renderHook(() => useSportEvents());

    const selectedDate = "2024-04-27";

    await act(async () => {
      result.current.getEvents(selectedDate);
      await waitForNextUpdate();
    });

    expect(result.current.loadEvents).toBe(false);
    expect(result.current.errorInEvents).toBe(true);
    expect(result.current.eventsByUser).toEqual([]);
  });
});
