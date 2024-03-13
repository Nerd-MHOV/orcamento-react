import { useState } from "react";
import { rowDiscountInitial } from "../../initial";
import RowModalDiscount from "../../interfaces/rowModalDiscount";

const useDiscountModal = () => {
  const [openModalDiscount, setOpenModalDiscount] = useState(false);
  const [discountBeingEdited, setDiscountBeingEdited] =
  useState(rowDiscountInitial);

    const handleCloseModalDiscount = () => {
        
        setOpenModalDiscount(false);
      };
    
      const handleClickOpenModalDiscount = (row: RowModalDiscount) => {
        setDiscountBeingEdited(row);
        setOpenModalDiscount(true);
      };
    
      const handleSaveModalDiscount = () => {
        setOpenModalDiscount(false);
      };
    
    return ({
        handleCloseModalDiscount,
        handleSaveModalDiscount,
        handleClickOpenModalDiscount,
        openModalDiscount,
        discountBeingEdited,
    })
}


export default useDiscountModal