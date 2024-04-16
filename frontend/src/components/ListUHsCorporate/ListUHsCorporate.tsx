import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useContext } from "react";
import { GenerateTariffContext, useGenerateTariff, useGenerateTariffCorporate } from "../../context/generateTariff/generateTariff";
import UHCorporateCard from './UHCorporateCard';
import ModalRoomLayout from './ModalRoomLayout';
import { CategoryOptionsProps } from '../../context/generateTariff/interfaces/categoriesProps';
import { RoomCorporate } from '../../context/generateTariff/interfaces/corporateProps';

export const ListUHsCorporate = () => {
    const {
        categoriesCorporateValues,
        getOccupancyUH,
        roomsToBudget,
        changeLayoutRoom,
    } = useGenerateTariffCorporate();


    const [open, setOpen] = React.useState(false);
    const [roomBeingEdited, setRoomBeingEdited] = React.useState<RoomCorporate | null>(null);

    const handleClickOpen = (category: RoomCorporate) => {
        setRoomBeingEdited(category)
        setOpen(true);
    };

    const handleClose = (
        adt: number,
        chd: number[],
        pet: string[],
        category: CategoryOptionsProps,
    ) => {
        setOpen(false);
        changeLayoutRoom(adt, chd, pet, category);
    };

    const handleApplyAll = (
        adt: number,
        chd: number[],
        pet: string[],
    ) => {
        setOpen(false);
        roomsToBudget.rooms.forEach(room => {
            changeLayoutRoom(adt, chd, pet, room.roomNumber);
        })
    }


    return (
        <>
            <ModalRoomLayout
                open={open}
                handleClose={handleClose}
                room={roomBeingEdited}
                handleApplyAll={handleApplyAll}
            />
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ "max-width": "800px", padding: "20px" }}>
                    {roomsToBudget.rooms.map((room, index) =>
                        <UHCorporateCard
                            room={room}
                            index={index}
                            key={index}
                            occupancy={getOccupancyUH(room.roomNumber)}
                            onClick={() => {
                                handleClickOpen(room)
                            }}
                        />
                    )}
                </Grid>
            </Box>
        </>
    );
}