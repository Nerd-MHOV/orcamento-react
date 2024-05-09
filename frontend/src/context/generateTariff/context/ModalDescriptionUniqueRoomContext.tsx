import React, {createContext, ReactNode, useContext, useState} from "react";
import DataContentProps from "../interfaces/tableBudgetDataContentProps";
import {useGenerateTariffCorporate} from "../generateTariff";

interface ModalDescriptionUniqueRoomContextProps {
    isOpen: boolean;
    loading: boolean;
    close: VoidFunction;
    open: (roomID: number) => void;
    data: DataContentProps | null;
}
export const ModalDescriptionUniqueRoomContext = createContext<ModalDescriptionUniqueRoomContextProps | null>(null);



export const ModalDescriptionUniqueRoomProvider: React.FC<{children: ReactNode}> = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataContentProps | null>(null);

    const {bodyResponseBudget, dataTable} = useGenerateTariffCorporate();

    function getaRoom(roomID: number) {
        if (!bodyResponseBudget) return;
        return bodyResponseBudget.withAdjustment.rooms.find(room => room.roomNumber.unit === roomID);
    }

    function open(roomID: number) {
        const room = getaRoom(roomID);

        if (!bodyResponseBudget || !room) return;
        setData({
            rows: room.rowsValues.rows,
            columns: dataTable.columns,
            arrComplete: {
                room: room.roomNumber.label
            }
        })
        setIsOpen(true);

    }
    function close() {
        setIsOpen(false);
    }
    return (
        <ModalDescriptionUniqueRoomContext.Provider
            value={{
                loading,
                isOpen,
                open,
                close,
                data,
            }}
        >
            {children}
        </ModalDescriptionUniqueRoomContext.Provider>
    )
}

export const useModalDescriptionUniqueRoom = () => {
    const context = useContext(ModalDescriptionUniqueRoomContext);
    if(!context) throw new Error ( "useModalDescriptionUniqueRoom must be used within a ModalDescriptionUniqueRoomProvider" )
    return context
}