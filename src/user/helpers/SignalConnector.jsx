import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { AlertNotification } from "../../utils/AlertNotification";
import { REACT_APP_SIGNALR } from "@env";


export const SignalConnector = (showInfo, userId) => {
    // const urlSignal = process.env.REACT_APP_SIGNALR;
    const urlSignal = 'https://sportappnotificationsapi20240430022527.azurewebsites.net'
    // const urlSignal = REACT_APP_SIGNALR;
    console.log(urlSignal)
    const [dataSignal, setDataSignal] = useState();
    const { showToastSuccess } = AlertNotification()
    let hubConnection;
    // istanbul ignore next
    useEffect(() => {
        const startSignal = () => {
            console.log("ReceiveMessage====> ", `ReceiveMessage${userId}`);
            hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(urlSignal)
                .withAutomaticReconnect()
                .build();
            hubConnection
                .start()
                .then(() => {
                    console.log("Connection started");
                })
                .catch((err) => console.log("Error while starting connection: " + err));
            hubConnection.on(`ReceiveMessage${userId}`, (data) => {
                setDataSignal(data);
            });
        };
        if (userId !== "" && userId != undefined) {
            startSignal();
        }
    }, [userId]);
    // istanbul ignore next
    useEffect(() => {
        if (dataSignal != undefined) {
            try {
                if (dataSignal != "") {
                    var msg = JSON.parse(dataSignal.trim());
                    const data = JSON.parse(msg);
                    const title = data.Title;
                    const Description = data.Description;
                    showToastSuccess(title, Description);
                }
            } catch (error) {
                console.error("Error parsing JSON:", dataSignal, error);
            }
        }
    }, [dataSignal]);
    // istanbul ignore next
    return { dataSignal };
};
