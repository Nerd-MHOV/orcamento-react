import { RowsProps, UnitaryDiscountProps } from "../CalcBudgetController";
import { CorporateBodyResponseBudget, CorporateBodySendBudget, RoomCorporateResponse } from "../CalcBudgetCorpController";
import { adultBudget } from "./adultBudget";
import { calcTotal, calcTotalBudgets } from "./calcTotal";
import { childBudget } from "./childBudget";
import { petBudget } from "./petBudget";
import { requirementBudget } from "./requirementBudget";


export async function mainCorp(bodyRequest: CorporateBodySendBudget) {
    
    const { dateRange, rooms, pension, requirements } = bodyRequest;

    let initDate = new Date(dateRange.startDate);
    let finalDate = new Date(dateRange.endDate);

    // mock variables
    const dailyCourtesy: boolean = false;
    const newRoomsPromises = rooms.map(async ( room ) => {
        const discount = bodyRequest.unitaryDiscount.find( unitaryD => unitaryD.id === Number(room.roomNumber.unit) && unitaryD.type === "room")?.discount ?? bodyRequest.discount;
        const arrForm = {
            adult: room.adt,
            discount,
            category: room.roomNumber.category,
            pension: pension,
        }
        const idRoom = Number(room.roomNumber.unit) * 100
        // calculate cost for adult, child, pet and requirements
        let adultRows = await adultBudget(arrForm, room.chd, bodyRequest.unitaryDiscount, dailyCourtesy, initDate, finalDate, idRoom);
        let childRows = await childBudget(arrForm, room.chd, bodyRequest.unitaryDiscount, dailyCourtesy, initDate, finalDate, idRoom);
        let petRows = await petBudget(arrForm, room.pet, bodyRequest.unitaryDiscount, initDate, finalDate, idRoom);
        let requirementRows = await requirementBudget(arrForm, [], bodyRequest.unitaryDiscount, initDate, finalDate, idRoom);

        const rows = [...adultRows, ...childRows, ...petRows, ...requirementRows]
        let newRoom: RoomCorporateResponse = {
            ...room,
            rowsValues: {
                rows: rows,
                total: calcTotal(rows, discount)
            }
        };
        return newRoom
    })
    
    // Awaiting to conclusion each async operation
    const newRooms = await Promise.all(newRoomsPromises);

    // requirement to budget ( all rooms )
    let requirementRows = await requirementBudget({ adult: 0 }, requirements, bodyRequest.unitaryDiscount, initDate, finalDate);
    const rowsFinal: RowsProps[] = [...calcTotalBudgets(newRooms), ...requirementRows];

    const response: CorporateBodyResponseBudget = {
        ...bodyRequest,
        rooms: newRooms,
        rowsValues: {
            rows: rowsFinal,
            total: calcTotal(rowsFinal, bodyRequest.discount)
        }
    }

    return response;
}