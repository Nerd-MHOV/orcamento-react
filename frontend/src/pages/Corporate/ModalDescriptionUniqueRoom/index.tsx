import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useModalDescriptionUniqueRoom} from "../../../context/generateTariff/context/ModalDescriptionUniqueRoomContext";
import RowsProps from "../../../context/generateTariff/interfaces/tableBudgetRowsProps";
import {calcTotal} from "../../../context/generateTariff/functions/calcTotal";
import DataContentProps from "../../../context/generateTariff/interfaces/tableBudgetDataContentProps";
import relationWithDiscountAndNoDiscount from "../../../components/TableCalc/relationWithDiscountAndNoDiscount";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDescriptionUniqueRoom() {
    const {
        isOpen, close, loading, data
    } = useModalDescriptionUniqueRoom();
    if(!data) return null
    return (
        <div>
            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={close}
                aria-describedby="alert-dialog-slide-description"
            >
                {!loading ? (
                    <>
                        <DialogTitle>
                            Descrição UH - {data.arrComplete.room}
                        </DialogTitle>
                        <DialogContent>
                            <TableModalDescriptionUniqueRoom data={data} />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={close}
                            >
                                Fechar
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <Box sx={{ display: "flex", padding: 15 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Dialog>
        </div>
    );
}

interface TableModalDescriptionUniqueRoomProps {
    data: DataContentProps
}

const TableModalDescriptionUniqueRoom = ({ data }: TableModalDescriptionUniqueRoomProps) => {
    let calc = calcTotal(data);
    let totalPerRow = calc.totalPerRow;
    let total = calc.total;
    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{ background: "#222e3f" }}>
                        {data.columns.map((column) => (
                            <TableCell
                                style={{ color: "white", fontWeight: "bold" }}
                                key={column}
                            >
                                {column}
                            </TableCell>
                        ))}
                        {!!data.columns.length && (
                            <>
                                <TableCell
                                    align="center"
                                    style={{ color: "white", fontWeight: "bold", maxWidth: 30 }}
                                >
                                    desconto% unitário
                                </TableCell>
                                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                                    TOTAL
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell
                                component="th"
                                scope="row"
                                style={{ background: "rgb(248,248,248)", cursor: "pointer" }}
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
                                        // onDoubleClick={() => {
                                        //     handleClickOpenModalDiscount({
                                        //         id: +row.id,
                                        //         name: row.desc,
                                        //         discount: +row.discountApplied,
                                        //     });
                                        // }}
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
                    ))}
                    <TableRow
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:last-child td": { background: "rgb(248,248,248)" },
                        }}
                    >
                        {!!total.total && (
                            <>
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
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
