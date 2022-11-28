
import { useEffect,  useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns/esm'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import TableCalc, { DataContentProps } from '../../components/TableCalc'
import './style.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { FormOrc } from '../../components/FormOrc'


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
            let init = date.startDate
            let final = date.endDate
            final = addDays(final, 1)
            while(init < final){
                newColumn.push(format(init, 'dd/MM'))
                init = addDays(init, 1);
            }

            setDataTable((par) => {
                return {
                    rows: par.rows,
                    columns: newColumn
                }
            })
    }

    function addRows(rows: any[]) {
        console.log(rows)
        setDataTable((par) => {
            return {
                rows: rows,
                columns: par.columns
            }
        })
    }

   

    const dataInitial = {
        rows: [
            // {
            //     id: 1,
            //     desc: 'Adulto 1',
            //     values: ['102,00', '102,00', '102,00', '102,00'],
            //     total: '408,00'
            // },
            // {
            //     id: 2,
            //     desc: 'Adulto 2',
            //     values: ['102,00', '102,00', '102,00', '102,00'],
            //     total: '408,00'
            // },
            // {
            //     id: 3,
            //     desc: 'TOTAL',
            //     values: ['204,00', '204,00', '204,00', '204,00'],
            //     total: '816,00',
            // }
        ],
        columns: ['desc', 'segunda', 'terça', 'quarta', 'quinta']
    }


    useEffect(() => {
        setDataTable(dataInitial);
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

                            <FormOrc selectionRange={selectionRange} addRows={addRows} />
                            
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