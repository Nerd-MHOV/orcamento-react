import RowModalDiscount from "./rowModalDiscount";

export interface UnitaryDiscountGTCP {
    addUnitaryDiscount: (row: RowModalDiscount) => void;
    handleClickOpenModalDiscount: (row: RowModalDiscount) => void;
    clearUnitaryDiscount: VoidFunction;

    handleCloseModalDiscount: VoidFunction;
    handleSaveModalDiscount: VoidFunction;
    openModalDiscount: boolean;
    discountBeingEdited: RowModalDiscount;
}