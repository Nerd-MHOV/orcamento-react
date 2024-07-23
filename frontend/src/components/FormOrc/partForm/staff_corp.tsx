import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";

export const StaffCorp = () => {
    const {
        toggleStaff,
        staff,
    } = useGenerateTariffCorporate()


    return (
        <div
            className="checkbox-staff"
        >
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={toggleStaff}
            >
                {staff ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </IconButton>{" "}
            <p style={{ color: "#757575" }}>Staff</p>
        </div>
    )

}