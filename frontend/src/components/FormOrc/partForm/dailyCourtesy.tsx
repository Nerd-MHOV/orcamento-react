import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useGenerateTariff, useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";
import { useEffect, useState } from "react";

export const DailyCourtesy = ({ corporate = false }) => {
    const {
        selectionRange,
        setDailyCourtesy,
        dailyCourtesy,
        actionSelected,
        dataTable,
        callHandleForm
    } = corporate ? useGenerateTariffCorporate() : useGenerateTariff();

    const getIsCourtesy = async () => {
        const isCourtesy = actionSelected?.daily_courtesy ?? false;
        if (!isCourtesy) {
            setDailyCourtesy(false);
        }
    };
    
    useEffect(() => {
        getIsCourtesy();
    }, [actionSelected, selectionRange, dataTable]);

    useEffect(() => {
        setTimeout(() => {
            callHandleForm();
        }, 100)
    }, [dailyCourtesy])

    if (actionSelected?.daily_courtesy)
        return (
            <div
                className="daily-courtesy"
            >
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                        setDailyCourtesy(!dailyCourtesy);
                    }}
                >
                    {dailyCourtesy ? <CheckBox /> : <CheckBoxOutlineBlank />}
                </IconButton>{" "}
                <p style={{ color: "#757575" }}>Diária Cortesia</p>
            </div>
        )

    return <></>
}