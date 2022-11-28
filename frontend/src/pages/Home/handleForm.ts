import serialize from 'form-serialize'

interface selectionRange {
    startDate: Date;
    endDate: Date;
    key: string;
}

export function handleForm(childValue: any[], petValue: any[], selectionRange: selectionRange) {
    const formup: HTMLFormElement | any = document.querySelector('#form')
    const responseForm = serialize(formup, { hash: true})

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
    
    const valueRs = '100,00'

    if(responseForm.adult) {
        let count = Number(responseForm.adult)
        while(count > 0) {

            console.log('ok')
            count --;
        }
    }

    let newRows = [
        {id: 1, desc: 'First', value: ['102', '102'], total: '204'}
    ]
    adultRows = [
        {id: 2, desc: 'Second', value: ['601','601'], total: '1202'}
    ]

    console.log([
        ...newRows,
        ...adultRows
    ])
}