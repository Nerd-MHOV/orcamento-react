import { useState } from "react";
import DataContentProps from "../../../context/generateTariff/interfaces/tableBudgetDataContentProps";
import RowsProps from "../../../context/generateTariff/interfaces/tableBudgetRowsProps";
import { Collapse, IconButton, Paper, Table, TableCell, TableContainer, TableRow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, Title } from "@mui/icons-material";
import relationWithDiscountAndNoDiscount from "../relationWithDiscountAndNoDiscount";
import Head from "./table-head";
import TableBodyComponent from "./table-body";
import { useGenerateTariffCorporate } from "../../../context/generateTariff/generateTariff";

interface RowProps {
    row: RowsProps,
    data: DataContentProps,
    collapse?: boolean,
}
const Row = ({ row, data, collapse = true }: RowProps) => {


    //collapse rows
    const { bodyResponseBudget, handleClickOpenModalDiscount } = useGenerateTariffCorporate();
    const room = bodyResponseBudget?.rooms.find(room => room.roomNumber.unit === row.id);
    const dataRowCollapse: DataContentProps = room ? {
        rows: room.rowsValues.rows,
        columns: data.columns
    } : { ...data }

    const [open, setOpen] = useState(false);
    return (
        <>
            <TableRow key={row.id}>

                {
                    collapse &&
                    (
                        <TableCell
                            style={{ background: "rgb(248,248,248)" }}
                        >
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                                style={{ background: "white" }}
                            >
                                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                    )
                }

                <TableCell
                    component="th"
                    scope="row"
                    style={{ background: "rgb(248,248,248)", cursor: "pointer" }}
                // onDoubleClick={() => {showRoom(row.id)}}
                >
                    {row.desc}
                </TableCell>

                {row.values.map((value, index) => (
                    <TableCell key={index} style={{ position: "relative" }}>
                        {relationWithDiscountAndNoDiscount(
                            value,
                            row.noDiscount[index]
                        )}
                    </TableCell>
                ))}

                {!!row.values.length && (
                    <>
                        <TableCell
                            align="center"
                            style={{ cursor: "pointer" }}
                            onDoubleClick={() => {
                                handleClickOpenModalDiscount({
                                    id: +row.id,
                                    name: row.desc,
                                    discount: +row.discountApplied,
                                    type: row.type,
                                });
                            }}
                        >
                            {row.discountApplied} %
                        </TableCell>
                        <TableCell
                            style={{
                                background: "rgb(248,248,248)",
                                fontWeight: "bold",
                                position: "relative",
                            }}
                        >
                            {relationWithDiscountAndNoDiscount(
                                row.total,
                                row.totalNoDiscount,
                                false
                            )}
                        </TableCell>
                    </>
                )}
            </TableRow>
            {
                collapse && (
                    <TableRow>
                        <TableCell style={{ paddingBottom: 1, paddingTop: 1 }} colSpan={row.values.length + 4}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <TableContainer component={Paper} style={{ marginTop: 30, marginBottom: 30 }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <Head collapse data={data} />
                                        <TableBodyComponent data={dataRowCollapse} collapse={false} />
                                    </Table>
                                </TableContainer>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                )
            }
        </>
    )
}

export default Row