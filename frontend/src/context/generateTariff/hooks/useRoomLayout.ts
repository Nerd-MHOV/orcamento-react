import { useState } from "react";
import PensionsOptionsProps from "../interfaces/pensionOptionsProps";

const useRoomLayout = () => {

    const [childValue, setChildValue] = useState<number[]>([]);
    const [petValue, setPetValue] = useState<string[]>([]);
    const [pensionValue, setPensionValue] = useState<PensionsOptionsProps | null>(
      null
    );
    const [disabledPension, setDisabledPension] = useState(false);

    return {
        childValue, setChildValue,
        petValue, setPetValue,
        pensionValue, setPensionValue,
        disabledPension, setDisabledPension
    }
}

export default useRoomLayout