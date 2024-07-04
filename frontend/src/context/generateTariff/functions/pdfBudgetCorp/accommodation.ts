import { CorporateBodyResponseBudget } from "../../../../hooks/api/interfaces"
import getLayoutRooms from "../file-part/getLayoutRooms"
import { applyBoder } from "./applyBorder"

export const doBodyAccommodation = (budget: CorporateBodyResponseBudget) => {
    const bodyAccommodation = budget.rooms.map(room => {
        return applyBoder([
          `${room.roomNumber.category}`,
          `${getLayoutRooms(room.adt, room.chd, room.pet).slice(2)}`,
          "R$ " + room.rowsValues.total.total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        ])
      })
      const totalAccommodation = () => {
        const adt = budget.rooms.reduce((accumulator, currentValue) => accumulator + currentValue.adt, 0).toLocaleString('pt-br', { minimumIntegerDigits: 2 })
        const chd = budget.rooms.reduce((accumulator, currentValue) => accumulator + currentValue.chd.length, 0).toLocaleString('pt-br', { minimumIntegerDigits: 2 })
        const pet = budget.rooms.reduce((accumulator, currentValue) => accumulator + currentValue.pet.length, 0).toLocaleString('pt-br', { minimumIntegerDigits: 2 })
        const totalAccomodationValue = budget.rooms.reduce((accumulator, currentValue) => accumulator + currentValue.rowsValues.total.total, 0)
        
        let stringLayoutTotalRoom = ""
        if(adt !== '00') stringLayoutTotalRoom += adt + ' ADT'
        if(chd !== '00') stringLayoutTotalRoom += '\n' + chd + ' CHD'
        if(pet !== '00') stringLayoutTotalRoom += '\n' + pet + ' PET'
        return applyBoder([
          "TOTAL HOSPEDAGEM",
          // `${budget.rooms.length.toLocaleString('pt-br', { minimumIntegerDigits: 2 })} quartos`,
          stringLayoutTotalRoom,
          "R$ " + totalAccomodationValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        ], "total_block")
      }
      bodyAccommodation.push(totalAccommodation())


      return bodyAccommodation;
}
