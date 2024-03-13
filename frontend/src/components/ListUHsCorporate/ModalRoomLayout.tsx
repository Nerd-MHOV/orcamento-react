import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { CategoryOptionsProps } from '../../context/generateTariff/interfaces/categoriesProps';
import { AdultFieldForm, AdultInputForm } from '../FormOrc/partForm/adult';
import { ChildFieldForm, ChildInputForm, onChangeChildFieldFormProps } from '../FormOrc/partForm/child';
import { OnChangePetFieldFormProps, PetFieldForm, PetInputForm } from '../FormOrc/partForm/pet';
import { DiscountInputForm } from '../FormOrc/partForm/discount';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalRoomLayoutProps {
    open: boolean,
    handleClose: VoidFunction,
    room: CategoryOptionsProps | null
}

export default function ModalRoomLayout({
    open, handleClose, room,
}: ModalRoomLayoutProps) {
    const [adultValue, setAdultValue] = React.useState<number>();
    const [childValue, setChildValue] = React.useState<number[]>([]);
    const [petValue, setPetValue] = React.useState<string[]>([]);


    function handleClear() {
        setAdultValue(0);
        setChildValue([]);
        setPetValue([]);
    }

    const changeAdult = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAdultValue(+e.target.value)
    }

    const changeChild: onChangeChildFieldFormProps = (_, newValue) => {
        setChildValue(newValue);
    }
    const changePet: OnChangePetFieldFormProps = (_, newValue) => {
        setPetValue(newValue);
    }
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{room?.label}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Informe a disposição do quarto!
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <AdultFieldForm
                    value={adultValue}
                    onChange={changeAdult}
                />
                <ChildFieldForm
                    value={childValue}
                    onChange={changeChild}
                />
                <PetFieldForm 
                    value={petValue}
                    onChange={changePet}
                />
                {/* <DiscountInputForm /> */}
            </DialogContent>
            <DialogActions>

                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={handleClose}>Confirma</Button>
            </DialogActions>
        </Dialog>
    );
}