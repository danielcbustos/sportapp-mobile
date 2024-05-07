import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { useGetCountries } from "../hooks/useGetCountries";
useGetCountries;

jest.mock("axios");

describe("useGetCountries", () => {
  test("should fetch countries successfully", async () => {
    const mockCountries = [
      { id: 1, name: "Country A" },
      { id: 2, name: "Country B" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const { result, waitForNextUpdate } = renderHook(() => useGetCountries(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.countries).toEqual([]);
    expect(result.current.countriesLoading).toBe(true);

    await act(async () => {
      result.current.fetchAllCountries();
      await waitForNextUpdate();
    });

    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.countriesLoading).toBe(false);
  });

  test("should handle error when fetching countries", async () => {
    const errorMessage = "Failed to fetch countries";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useGetCountries(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.countries).toEqual([]);
    expect(result.current.countriesLoading).toBe(true);

    await act(async () => {
      result.current.fetchAllCountries();
      await waitForNextUpdate();
    });

    expect(result.current.countries).toEqual([]);
    expect(result.current.countriesLoading).toBe(false);
  });
});
