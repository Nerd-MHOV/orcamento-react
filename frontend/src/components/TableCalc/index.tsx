import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper } from '@mui/material';
import './style.scss'

export type RowsProps = {
  id: number;
  desc: string;
  values: string[]
  total: string;
}

export type DataProps = {
  data: DataContentProps
}

export type DataContentProps = {
  rows: Array<RowsProps> | [];
  columns: string[] | [];
}


const TableCalc = ({data}: DataProps) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            style={{background: '#222e3f'}}
          >
            {
              data.columns.map(column => 
              <TableCell style={{color: 'white', fontWeight: 'bold'}}>{column}</TableCell>
              )
            }
            {
              !!data.columns.length && 
              <TableCell style={{color: 'white', fontWeight: 'bold'}}>TOTAL</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (

            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },
                    '&:last-child td': {background: 'rgb(248,248,248)'} }}
            >
              <TableCell component="th" scope="row" style={{background: 'rgb(248,248,248)'}}>
                {row.desc}
              </TableCell>

              {
                row.values.map((value) => 
                  <TableCell>{value}</TableCell>
                )
              }
              {
                !!row.values.length &&
                <TableCell style={{background: 'rgb(248,248,248)', fontWeight: 'bold'}}>{row.total}</TableCell>
              }
                  

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCalc