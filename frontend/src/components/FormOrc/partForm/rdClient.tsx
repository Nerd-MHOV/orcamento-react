import {TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {GenerateTariffContext, useGenerateTariff} from "../../../context/generateTariff/generateTariff";
import useQuery from "../../../hooks/urlQuery/query";

export const RdClientInputForm = () => {
    const {callHandleForm, getClientName} = useGenerateTariff();
    const query = useQuery()
    const [value, setValue] = useState<String>()

    useEffect(() => {
        if (query.get("client_id")) setValue(query.get("client_id")!)
    }, []);
    return (
        <TextField
            name="rd_client"
            label="id do client"
            type="text"
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                callHandleForm()
                getClientName(e.target.value)
            }}
            className="textField"
            variant="standard"
        />
    );
};
