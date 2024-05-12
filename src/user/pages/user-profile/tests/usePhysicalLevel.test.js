import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../../../store/store";
import { usePhysicalLevel } from "../hooks/usePhysicalLevel";

jest.mock("axios");

describe("usePhysicalLevel", () => {
  test("should fetch physical levels successfully", async () => {
    const mockPhysicalLevels = [
      { id: 1, name: "Level A" },
      { id: 2, name: "Level B" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockPhysicalLevels });

    const { result, waitForNextUpdate } = renderHook(() => usePhysicalLevel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.physicalLevel).toEqual([]);
    expect(result.current.physicalLevelLoading).toBe(true);

    await act(async () => {
      result.current.fetchPhysicalLevels();
      await waitForNextUpdate();
    });

    expect(result.current.physicalLevel).toEqual(mockPhysicalLevels);
    expect(result.current.physicalLevelLoading).toBe(false);
  });

  test("should handle error when fetching physical levels", async () => {
    const errorMessage = "Failed to fetch physical levels";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => usePhysicalLevel(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.physicalLevel).toEqual([]);
    expect(result.current.physicalLevelLoading).toBe(true);

    await act(async () => {
      result.current.fetchPhysicalLevels();
      await waitForNextUpdate();
    });

    expect(result.current.physicalLevel).toEqual([]);
    expect(result.current.physicalLevelLoading).toBe(false);
  });
});
