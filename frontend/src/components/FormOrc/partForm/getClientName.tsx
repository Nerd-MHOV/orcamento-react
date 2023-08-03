import {useContext, useState} from "react";
import {GenerateTariffContext} from "../../../context/generateTariff/generateTariff";


export const GetClientName = () => {
    const {
        clientName
    } = useContext(GenerateTariffContext)

    return <div className="client_name" style={!clientName ? {display: "none"} : {}}>
        <p>{clientName}</p>
    </div>
}