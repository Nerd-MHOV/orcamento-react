import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Btn from "../Btn";
import {Box} from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export  function ModalConfirmGroup({open, handleClose, handleConclusion}: {
    open: boolean;
    handleClose: VoidFunction;
    handleConclusion: (group: boolean) => void
}) {


    return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Salvar como?"}</DialogTitle>
                <DialogContent>
                    <Box
                     sx={{ flexDirection: 'column', display: "flex", gap: 1}}
                    >
                        <Btn color="orange"
                             onClick={() => { handleConclusion(true) }}
                             action="Grupo de Hospedagem"/>
                        <Btn color="green" onClick={() => {handleConclusion(false)}} action={"Orçamento Simples"} />
                    </Box>
                </DialogContent>
            </Dialog>
    );
}