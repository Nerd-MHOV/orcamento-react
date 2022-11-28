import serialize from 'form-serialize'

interface selectionRange {
    startDate: Date;
    endDate: Date;
    key: string;
}

export function handleForm(childValue: any[], petValue: any[], selectionRange: selectionRange, addRows: (rows: any[]) => void) {
    const formup: HTMLFormElement | any = document.querySelector('#form')
    const responseForm = serialize(formup, { hash: true})

    const umDia = 24*60*60*1000; // horas*minutos*segundos*milisegundos

    const checkin = selectionRange.startDate;

    const checkout = selectionRange.endDate;

    const daily = Math.round(Math.abs((checkin.getTime() - 
    checkout.getTime())/(umDia)));


    console.log(responseForm)
    console.log(childValue)
    console.log(petValue)
    
    let adultRows = [];
    let childRows = [];
    let petRows = [];
    let completeRows = [];
    
    if(!responseForm.category) {
        return
    }
    
    const valueRs = 100

    if(responseForm.adult) {
        let count = Number(responseForm.adult)
        let countDaily = daily;
        let value = []
        let total = 0
        while(count > 0) {

            while (countDaily > 0) {
                value.push(valueRs)
                total += Number(valueRs)
                countDaily --;
            }
            
            adultRows.push({
                id: 100+count, desc: 'adult '+count, value: value, total: total
            })
            console.log('ok')
            count --;
        }
    }


    console.log([
        ...adultRows
    ])

    addRows([...adultRows])
}