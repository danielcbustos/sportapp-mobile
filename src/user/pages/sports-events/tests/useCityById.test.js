import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";
import { useSelector } from "react-redux";
import { useCityByUser } from "../../../hooks/useCityById";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("axios");

describe("useCityByUser", () => {
  beforeEach(() => {
    useSelector.mockClear();
  });

  it("should fetch city data successfully", async () => {
    useSelector.mockReturnValue("mock-token");

    const mockCityId = 1;
    const mockCityData = "Mock City Name";

    axios.get.mockResolvedValueOnce({ data: mockCityData });

    const { result, waitForNextUpdate } = renderHook(() => useCityByUser());

    result.current.fetchCity(mockCityId);

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);

    expect(result.current.cityName).toBe(mockCityData);

    expect(axios.get).toHaveBeenCalledWith(
      `https://sportappusersapi.azurewebsites.net/api/Geography/CitiesById/${mockCityId}`,
      { headers: { Authorization: "Bearer mock-token" } }
    );
  });
});
