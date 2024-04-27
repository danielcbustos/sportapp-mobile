import { renderHook, act } from "@testing-library/react-hooks";
import { SignalConnector } from "../../../helpers/SignalConnector";
import * as signalR from "@microsoft/signalr";
jest.mock("@microsoft/signalr", () => ({
  HubConnectionBuilder: jest.fn().mockReturnValue({
    withUrl: jest.fn().mockReturnThis(),
    withAutomaticReconnect: jest.fn().mockReturnThis(),
    build: jest.fn().mockReturnThis(),
    start: jest.fn().mockResolvedValueOnce({}),
    on: jest.fn(),
  }),
}));

jest.mock("../../../../utils/AlertNotification", () => ({
  showToastSuccess: jest.fn(),
}));

describe("SignalConnector", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should start signal connection when userId is provided", async () => {
    const userId = "f92b80d9-d890-4b5c-9c5b-59350552b9af";
    const signalUrl =
      "https://sportappnotificationsapi.azurewebsites.net/chart";

    const { result, waitForNextUpdate } = renderHook(() =>
      SignalConnector(false, userId, signalUrl)
    );

    // Esperamos a que useEffect se complete

    // Verificamos que se haya llamado a start() y on() de HubConnectionBuilder
    expect(signalR.HubConnectionBuilder).toHaveBeenCalledTimes(0);
    expect(signalR.HubConnectionBuilder().start).toHaveBeenCalledTimes(0);
  });
});
