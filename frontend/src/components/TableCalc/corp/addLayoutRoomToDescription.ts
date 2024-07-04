import DataContentProps from "../../../context/generateTariff/interfaces/tableBudgetDataContentProps";
import RowsProps from "../../../context/generateTariff/interfaces/tableBudgetRowsProps";
import { CorporateBodyResponseBudget } from "../../../hooks/api/interfaces";

export default function addLayoutRoomToDescription( data: DataContentProps, body: CorporateBodyResponseBudget | null ): DataContentProps {
    function getRoom(row: RowsProps) {
        return body?.rooms.find( room => row.desc.includes(room.roomNumber.label))
    }
    const newData = data;
    const newRows = data.rows.map(row => {
        const room = getRoom(row);
        if(!room) return row;
        const layoutRoom = getLayoutRooms(room.adt, room.chd, room.pet)
        if (row.type === "room" && !row.desc.includes(layoutRoom)) row.desc = row.desc + layoutRoom;
        return row;
    })
    newData.rows = newRows
    return newData;
}


function getLayoutRooms (adt: number, chd: number[], pet: string[]) {
    let adultSting =
    adt < 10
      ? "0" + adt + " ADT "
      : adt !== 0
      ? adt + " ADT "
      : "";

  let childString =
    chd.length === 0
      ? ""
      : chd.length < 10
      ? "- 0" + chd.length + " CHD "
      : "- " + chd.length + " CHD ";

  let petString =
    pet.length === 0
      ? ""
      : pet.length < 10
      ? "- 0" + pet.length + " PET"
      : "- " + pet.length + " PET";


      
  return " ( " + adultSting + childString + petString + ' )';
}
