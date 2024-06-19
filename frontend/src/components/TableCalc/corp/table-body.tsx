import DataContentProps from "../../../context/generateTariff/interfaces/tableBudgetDataContentProps"
import {
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material'
import relationWithDiscountAndNoDiscount from "../relationWithDiscountAndNoDiscount"
import { calcTotal } from "../../../context/generateTariff/functions/calcTotal"
import Row from "./table-row"

interface TableDataCollapseProps {
    data: DataContentProps,
    collapse?: boolean
}

const LastRowTotal = ({ data, collapse = false }: TableDataCollapseProps) => {
    let calc = calcTotal(data);
    let totalPerRow = calc.totalPerRow;
    let total = calc.total;
    return (
        <TableRow
            sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:last-child td": { background: "rgb(248,248,248)" },
            }}
        >
            {!!total.total && (
                <>
                    {collapse && <TableCell></TableCell>}
                    <TableCell
                        component="th"
                        scope="row"
                        style={{ background: "rgb(248,248,248)" }}
                    >
                        TOTAL
                    </TableCell>

                    {totalPerRow.map((value, index) => (
                        <TableCell key={index} style={{ position: "relative" }}>
                            {relationWithDiscountAndNoDiscount(
                                value.total,
                                value.noDiscount,
                                false
                            )}
                        </TableCell>
                    ))}

                    <TableCell
                        style={{
                            background: "rgb(248,248,248)",
                            fontWeight: "bold",
                            color: "#d34747",
                        }}
                        align="center"
                    >
                        {total.total - total.noDiscount}
                    </TableCell>

                    <TableCell
                        style={{
                            background: "rgb(248,248,248)",
                            fontWeight: "bold",
                            position: "relative",
                        }}
                    >
                        {relationWithDiscountAndNoDiscount(
                            total.total,
                            total.noDiscount,
                            false
                        )}
                    </TableCell>
                </>
            )}
        </TableRow>
    )
}

const TableBodyComponent = ({ data, collapse = true }: TableDataCollapseProps) => {
    return (
        <TableBody>
            {data.rows.map((row) => (
                <Row row={row} data={data} key={row.id} collapse={collapse} />
            ))}
            <LastRowTotal collapse={collapse} data={data} />
        </TableBody>
    )
}

export default TableBodyComponent