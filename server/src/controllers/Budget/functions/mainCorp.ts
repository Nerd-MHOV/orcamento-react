import { ArrFormProps, ArrRequirementProps, PetProps, RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { CorporateBodySendBudget, RoomCorporateResponse } from "../CalcBudgetCorpController";
import { adultBudget } from "./adultBudget";
import { calcTotal } from "./calcTotal";
import { childBudget } from "./childBudget";
import { petBudget } from "./petBudget";
import { requirementBudget } from "./requirementBudget";


export async function mainCorp({
    dateRange, rooms, requirements, pension
}: CorporateBodySendBudget) {
    


    let initDate = new Date(dateRange.startDate);
    let finalDate = new Date(dateRange.endDate);

    // mock variables
    const unitaryDiscount: UnitaryDiscountProps[] = [];
    const dailyCourtesy: boolean = false;
    let newRooms: RoomCorporateResponse[];
    rooms.forEach(async ( room ) => {
        const arrForm = {
            adult: room.adt,
            discount: 0,
            category: room.roomNumber.category,
            pension: pension,
        }
        //adult
        let adultRows = await adultBudget(arrForm, room.chd, unitaryDiscount, dailyCourtesy, initDate, finalDate);

        //child
        let childRows = await childBudget(arrForm, room.chd, unitaryDiscount, dailyCourtesy, initDate, finalDate);

        //pet
        let petRows = await petBudget(arrForm, room.pet, unitaryDiscount, initDate, finalDate);

        //requirement
        let requirementRows = await requirementBudget(arrForm, [], unitaryDiscount, initDate, finalDate);
        const rows = [...adultRows, ...childRows, ...petRows, ...requirementRows]
        let newRoom: RoomCorporateResponse = {
            ...room,
            rowsValues: {
                rows: rows,
                total: calcTotal(rows)
            }
        };

        newRooms.push(newRoom)
    })
    

    //requirement
    let requirementRows = await requirementBudget({ adult: 0 }, requirements, unitaryDiscount, initDate, finalDate);

    return {
        rows: [...adultRows, ...childRows, ...petRows, ...requirementRows,],
    };
}