import { useState } from "react";


const usePermission = () => {
  const [isOpenModalPermission, setIsOpenModalPermission] = useState(false);
  const [valuePermissionModal, setValuePermissionModal] = useState(0);
  const [functionChangeDiscount, setFunctionChangeDiscount] = useState({
    func: function (value: number) { },
  });

  const handleOpenModalPermission = (
    value: number,
    setDiscount: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setValuePermissionModal(value);
    setFunctionChangeDiscount({
      func: setDiscount,
    });
    setIsOpenModalPermission(true);
  };


  const handleCloseModalPermission = () => {
    setIsOpenModalPermission(false);
  };
  

  const handleConfirmModalPermission = async (password: string) => {
    if (password === "admin@2355") {
      functionChangeDiscount.func(valuePermissionModal);
      return true;
    }

    // if (
    //   password === "ajuste" &&
    //   valuePermissionModal &&
    //   valuePermissionModal <= 20
    // ) {
    //   functionChangeDiscount.func(valuePermissionModal);
    //   return true;
    // }
    return false;
  };



  return ({
    isOpenModalPermission,
    handleCloseModalPermission,
    handleOpenModalPermission,
    handleConfirmModalPermission,
  })
}


export default usePermission;