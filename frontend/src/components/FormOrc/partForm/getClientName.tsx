import {useContext, useState} from "react";
import {GenerateTariffContext, useGenerateTariff} from "../../../context/generateTariff/generateTariff";


export const GetClientName = ({ clientName = "" }) => {
    return <div className="client_name" style={!clientName ? {display: "none"} : {}}>
        <p>{clientName}</p>
    </div>
}