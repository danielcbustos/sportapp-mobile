import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useGetGenres } from "../hooks/useGetGenres";

jest.mock("axios");

describe("useGetGenres", () => {
  test("should fetch genres successfully", async () => {
    const mockGenres = [
      { id: 1, name: "Genre A" },
      { id: 2, name: "Genre B" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockGenres });

    const { result, waitForNextUpdate } = renderHook(() => useGetGenres(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.genres).toEqual([]);
    expect(result.current.genresLoading).toBe(true);

    await act(async () => {
      result.current.fetchGenres();
      await waitForNextUpdate();
    });

    expect(result.current.genres).toEqual(mockGenres);
    expect(result.current.genresLoading).toBe(false);
  });

  test("should handle error when fetching genres", async () => {
    const errorMessage = "Failed to fetch genres";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useGetGenres(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.genres).toEqual([]);
    expect(result.current.genresLoading).toBe(true);

    await act(async () => {
      result.current.fetchGenres();
      await waitForNextUpdate();
    });

    expect(result.current.genres).toEqual([]);
    expect(result.current.genresLoading).toBe(false);
  });
});
