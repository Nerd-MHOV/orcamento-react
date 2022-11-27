
import { Autocomplete, Select, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import serialize from 'form-serialize'
import { addDays } from 'date-fns/esm'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import TableCalc, { DataContentProps, DataProps } from '../../components/TableCalc'
import './style.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'


const Home = () => {

    const [dataTable, setDataTable] = useState<DataContentProps>({
        rows: [],
        columns: []
    });
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })
    const [childValue, setChildValue] = useState<any[]>([])
    const [petValue, setPetValue] = useState<any[]>([])

    async function handleSelect(ranges: any) {
        setSelectionRange(ranges.selection)  
        changeColumnData(ranges.selection)
    }


    function changeColumnData(date: {
        endDate: Date,
        key: string
        startDate: Date,
    }) {
            console.log('date', date)
            let newColumn: string[] = ['Desc']
            //let maxDate: Date = addDays(date.endDate, 1)
            let init = date.startDate
            let final = date.endDate
            final = addDays(final, 1)
            while(init < final){
                newColumn.push(format(init, 'dd/MM'))
                init = addDays(init, 1);
                // date.startDate.setDate(date.startDate.getDate() + 1)
            }

            setDataTable((par) => {
                return {
                    rows: par.rows,
                    columns: newColumn
                }
            })
    }

    function handleForm() {
        const formUp: HTMLFormElement | any = document.querySelector('#form')
        const responseForm = serialize(formUp, { hash: true})

        console.log(responseForm)
        console.log(childValue)
        console.log(petValue)
        

        let newRows = [
            {id: 1, desc: 'First', value: ['102', '102'], total: '204'}
        ]
        let adultRows = [
            {id: 2, desc: 'Second', value: ['601','601'], total: '1202'}
        ]

        console.log([
            ...newRows,
            ...adultRows
        ])
    }

    const dataInitial = {
        rows: [
            {
                id: 1,
                desc: 'Adulto 1',
                values: ['102,00', '102,00', '102,00', '102,00'],
                total: '408,00'
            },
            {
                id: 2,
                desc: 'Adulto 2',
                values: ['102,00', '102,00', '102,00', '102,00'],
                total: '408,00'
            },
            {
                id: 3,
                desc: 'TOTAL',
                values: ['204,00', '204,00', '204,00', '204,00'],
                total: '816,00',
            }
        ],
        columns: ['desc', 'segunda', 'terça', 'quarta', 'quinta']
    }

    useEffect(() => {
        setDataTable(dataInitial)
    }, [])

    return (
        <div className="home">
            <Sidebar />
            <div className="homeBx">
                <Navbar />
                <div className="p20">
                    <div className="containerBx">
                        <div className="top">
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={handleSelect}
                                months={2}
                                showDateDisplay={false}
                                direction="horizontal"
                                locale={ptBR}
                            />

                            <form id="form" className="form">
                                <TextField
                                    label="Adulto"
                                    type="number"
                                    name='adult'
                                    className='textField'
                                    variant='standard'
                                    onChange={handleForm}
                                />
                                <Autocomplete
                                    multiple
                                    componentName='child'
                                    onChange={async (_, newValue) => {
                                        
                                        await Promise.resolve(setChildValue(newValue)).then(
                                            () => {handleForm()}
                                        )
                                    }}
                                    value={childValue}
                                    options={[
                                        '1','2','3','4','5','6','7','8','9','10','11','12'
                                    ]}
                                    isOptionEqualToValue={() => false}
                                    className='textField'
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Criança"
                                            type="text"
                                            placeholder='idade'
                                            variant='standard'
                                            onChange={handleForm}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    multiple
                                    options={['pequeno', 'médio', 'grande']}
                                    isOptionEqualToValue={() => false}
                                    className='textField'
                                    onChange={(_, newValue) => {
                                        setPetValue(newValue)
                                        handleForm()
                                    }}
                                    value={petValue}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Pet"
                                            name='pet'
                                            placeholder='porte'
                                            type="text"
                                            variant='standard'
                                        />
                                    )}
                                />
                                <Autocomplete
                                    options={['padrão', 'padrão varanda', 'luxo', 'luxo hidro ou conjugado']}
                                    className='textField'
                                    onChange={handleForm}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            name='category'
                                            label="Categoria"
                                            type="text"
                                            variant='standard'
                                        />
                                    )}
                                />
                                <TextField
                                    label="Nº Pipe"
                                    type="number"
                                    name='numberPipe'
                                    onChange={handleForm}
                                    className='textField'
                                    variant='standard'
                                />
                            </form>
                        </div>

                        <div className="bottom">
                            <TableCalc data={dataTable} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home