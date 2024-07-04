import { TableCell, TableHead, TableRow } from "@mui/material"
import DataContentProps from "../../../context/generateTariff/interfaces/tableBudgetDataContentProps"

interface HeadProps {
    data: DataContentProps
    collapse?: boolean
  }
  const Head = ({ data, collapse = false }: HeadProps) => {
    const styleTableRow = collapse
      ? { background: "#222f3ea1" }
      : { background: "#222e3f" }
    const styleTableCell = collapse
      ? { color: "white", fontWeight: "bold", paddingTop: 1, paddingBottom: 1 }
      : { color: "white", fontWeight: "bold" }
    return (
      <TableHead>
        <TableRow style={styleTableRow}>
            { !collapse && <TableCell></TableCell> }
          
          {data.columns.map((column) => (
            <TableCell
              style={styleTableCell}
              key={column}
            >
              {column}
            </TableCell>
          ))}
          {!!data.columns.length && (
            <>
              <TableCell
                align="center"
                style={{ ...styleTableCell, maxWidth: 30 }}
              >
                desconto% unitário
              </TableCell>
              <TableCell style={styleTableCell}>
                TOTAL
              </TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
    )
  }

  
  export default Head