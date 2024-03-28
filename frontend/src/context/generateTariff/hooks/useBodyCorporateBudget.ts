import { useState } from "react";
import { CorporateBodySendBudget, RoomCorporate } from "../interfaces/corporateProps";
import { corporateBodySendBudgetInitial } from "../initial";
import RequirementSubmitProps from "../interfaces/requirementSubmitProps";
import SelectionRangeProps from "../interfaces/selectionRangeProps";

const useBodyCorporateBudget = () => {
    const [roomsToBudget, setRoomsToBudget] = useState<CorporateBodySendBudget>(corporateBodySendBudgetInitial);

    function addRoomCorporate(rooms: RoomCorporate[]) {
        const newRooms = [...roomsToBudget.rooms];
        rooms.forEach( room => {
            const index = roomsToBudget.rooms.findIndex(oldRoom => oldRoom.roomNumber === room.roomNumber);
            if (index > -1) {    // Se o quarto já existe, atualize-o
                newRooms[index] = room;
            } else {            // Se o quarto não existe, adicione-o ao array
                newRooms.push(room);
            }  
        })
        setRoomsToBudget(old => ( {
            ...old,
            rooms: newRooms
        } ))
    }

    function deleteRoomCorporate(rooms: RoomCorporate[]) {
        const toDeleteIndex: number[] = [];
        rooms.forEach( room => {
            const index = roomsToBudget.rooms.findIndex(oldRoom => oldRoom.roomNumber === room.roomNumber);
            toDeleteIndex.push(index);
        })
        setRoomsToBudget(old => ( {
            ...old,
            rooms: old.rooms.filter((_, index) => !toDeleteIndex.includes(index))
        } ))
    }

    function changePension(pension: string) {
        setRoomsToBudget(old => ({
            ...old,
            pension, 
        }))
    }

    function changeRequirementCorporate(requirements: RequirementSubmitProps[]) {
        setRoomsToBudget(old => ( {
            ...old,
            requirements,
        } ))
    }

    function changeDateCorporateBudget(dateRange: SelectionRangeProps) {
        setRoomsToBudget(old => ({
            ...old,
            dateRange,
        }))
    }

    function changeIdClient( idClient: string | null ) {
        setRoomsToBudget(old => ({
            ...old,
            idClient,
        }))
    }
    return {
        roomsToBudget,
        addRoomCorporate,
        deleteRoomCorporate,
        changePension,
        changeRequirementCorporate,
        changeDateCorporateBudget,
        changeIdClient,
    }
}

export default useBodyCorporateBudget