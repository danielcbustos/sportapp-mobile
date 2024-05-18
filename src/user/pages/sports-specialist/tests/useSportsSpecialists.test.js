import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";

import { useSportsSpecialists } from "../hooks/useSportsSpecialists";

jest.mock("axios");

describe("useSportsSpecialists", () => {
  it("should fetch specialists successfully", async () => {
    const mockResponse = [
      { id: 1, name: "Specialist 1" },
      { id: 2, name: "Specialist 2" },
    ];

    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const { result, waitForNextUpdate } = renderHook(() =>
      useSportsSpecialists()
    );

    const selectedDate = "2024-05-26";

    await act(async () => {
      result.current.getSportsSpecialist(selectedDate);
      await waitForNextUpdate();
    });

    expect(result.current.loadSportsSpecialist).toBe(false);
    expect(result.current.errorInSportsSpecialist).toBe(false);
    expect(result.current.sportsSpecialist).toEqual(mockResponse);
  });

  it("should handle fetch events error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Server error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useSportsSpecialists()
    );

    const selectedDate = "2024-05-26";

    await act(async () => {
      result.current.getSportsSpecialist(selectedDate);
      await waitForNextUpdate();
    });

    expect(result.current.loadSportsSpecialist).toBe(false);
    expect(result.current.errorInSportsSpecialist).toBe(true);
    expect(result.current.sportsSpecialist).toEqual([]);
  });
});
