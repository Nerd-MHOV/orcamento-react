import { useState } from "react";
import RowModalDiscount from "../../interfaces/rowModalDiscount";


const useUnitaryDiscount = () => {
    const [unitaryDiscount, setUnitaryDiscount] = useState<RowModalDiscount[]>([]);


    const addUnitaryDiscount = (row: RowModalDiscount) => {
        setUnitaryDiscount((old) => {
            let editable: RowModalDiscount[] = [];
            let editableOld = old;
            let newItem = true;

            editableOld = old.map((item) => {
                if (item.id === row.id) {
                    newItem = false;
                    item.discount = row.discount;
                }

                return item;
            });

            if (newItem) {
                editable.push(row);
            }

            return [...editableOld, ...editable];
        });
    };



    const clearUnitaryDiscount = () => {
        setUnitaryDiscount([]);
    };



    return ({
        addUnitaryDiscount,
        clearUnitaryDiscount,
        unitaryDiscount
    })
}




export default useUnitaryDiscount