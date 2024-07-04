import { useState } from "react";
import { CorporateBodySendBudget } from "../interfaces/corporateProps";
import { corporateBodySendBudgetInitial } from "../initial";
import RequirementSubmitProps from "../interfaces/requirementSubmitProps";
import SelectionRangeProps from "../interfaces/selectionRangeProps";
import { CategoryOptionsProps } from "../interfaces/categoriesProps";
import { BodyCorporateBudgetGTCP } from "../interfaces/generateTariffCorporateContextProps";
import {CorporateBodyResponseBudget} from "../../../hooks/api/interfaces";
import RowModalDiscount from "../interfaces/rowModalDiscount";

const useBodyCorporateBudget = (): BodyCorporateBudgetGTCP => {
    const [roomsToBudget, setRoomsToBudget] = useState<CorporateBodySendBudget>(corporateBodySendBudgetInitial);
    
    const [bodyResponseBudget, setBodyResponseBudget] = useState<CorporateBodyResponseBudget | null>(null);

    function addRoomCorporate(categories: CategoryOptionsProps[]) {
        const newRooms = [...roomsToBudget.rooms];
        categories.forEach( category => {
            const index = roomsToBudget.rooms.findIndex(oldRoom => oldRoom.roomNumber === category);
            if (index > -1) {    // Se o quarto já existe, atualize-o
                newRooms[index].roomNumber = category;
            } else {            // Se o quarto não existe, adicione-o ao array
                newRooms.push({
                    adt: 0,
                    chd: [],
                    pet: [],
                    roomNumber: category
                });
            }  
        })
        setRoomsToBudget(old => ( {
            ...old,
            rooms: newRooms
        } ))
    }

    function deleteRoomCorporate(categories: CategoryOptionsProps[]) {
        const toDeleteIndex: number[] = [];
        const roomsMock = [...roomsToBudget.rooms]

        categories.forEach( category => {
            const index = roomsMock.findIndex(oldRoom => oldRoom.roomNumber.unit === category.unit);
            toDeleteIndex.push(index);
        })
        setRoomsToBudget(old => ( {
            ...old,
            rooms: old.rooms.filter((_, index) => !toDeleteIndex.includes(index))
        } ))
    }

    function changeCategoryToRoomCorporate(categories: CategoryOptionsProps[]) {
        const add = categories.filter( category => !roomsToBudget.rooms.some(room => room.roomNumber === category))
        const remove = roomsToBudget.rooms.filter( room => !categories.some(category => room.roomNumber === category))

        const removeCategory: CategoryOptionsProps[] = remove.map(obj => ({ ...obj.roomNumber }))

        addRoomCorporate(add)
        deleteRoomCorporate(removeCategory)
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

    function verifyIfAllRoomHasEnoughOnePax() {
        let pass = true;
        roomsToBudget.rooms.forEach(room => {
            if(room.adt === 0 && room.chd.length === 0) {
                pass = false;
            }
        })

        return pass
    }

    function changeLayoutRoom( adt: number, chd: number[], pet: string[], roomNumber: CategoryOptionsProps  ) {
        const rooms = [...roomsToBudget.rooms]
        const editIndex = rooms.findIndex(room => room.roomNumber === roomNumber)
        rooms[editIndex].adt = adt
        rooms[editIndex].chd = chd
        rooms[editIndex].pet = pet

        setRoomsToBudget(old => ({
            ...old,
            rooms,
        }))

    }

    function changeGenereralDiscount( discount: number ) {
        setRoomsToBudget( old => ({
            ...old,
            discount,
        }))
    }

    function changeUnitaryDiscounts( discounts: RowModalDiscount[] ) {
        setRoomsToBudget( old => ({
            ...old,
            unitaryDiscount: discounts
        }))
    }

    return {
        roomsToBudget,
        bodyResponseBudget,
        setBodyResponseBudget,
        addRoomCorporate,
        deleteRoomCorporate,
        changePension,
        changeRequirementCorporate,
        changeDateCorporateBudget,
        changeIdClient,
        changeLayoutRoom,
        changeCategoryToRoomCorporate,
        verifyIfAllRoomHasEnoughOnePax,
        changeGenereralDiscount,
        changeUnitaryDiscounts,
    }
}

export default useBodyCorporateBudget