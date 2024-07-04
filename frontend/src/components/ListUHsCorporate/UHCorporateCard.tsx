import { CategoryOptionsProps } from "../../context/generateTariff/interfaces/categoriesProps"
import { occupacyUHProps } from "../../context/generateTariff/interfaces/generateTariffContextProps"
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useContext } from "react";
import { GenerateTariffContext } from "../../context/generateTariff/generateTariff";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { RoomCorporate } from "../../context/generateTariff/interfaces/corporateProps";


const getStatusColor = (status: "completed" | "fail" | null) => {
    switch (status) {
        case "completed":
            return ""
        case "fail":
            return "#ff411c94"
        default:
            return "#e9e9e9"
    }
}

interface ItemProps {
    status: string;
}

const Item = styled(Paper)<ItemProps>(({ theme, status }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : status,
    ...theme.typography.body2,
    padding: "6px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow: "6px 6px #ccc;",
    border: '1px solid #ccc'
}));

interface UHCorporateCardProps {
    occupancy: occupacyUHProps,
    index: number,
    room: RoomCorporate,
    onClick?: VoidFunction
}
const UHCorporateCard = ({ occupancy, index, room, onClick }: UHCorporateCardProps) => {
    const is_completed = !room.adt && room.chd.length === 0 && room.pet.length === 0 ? false : true
    const color_params = is_completed ? 'completed' : null
    const pax = room.adt + room.chd.length
    const is_occupancy_pax = pax >= occupancy.min && pax <= occupancy.max ? true : false
    const is_occupancy = !is_completed ? true : is_occupancy_pax

    return (
        <Grid item xs={2} sm={4} md={4} key={index} onClick={onClick} style={{ cursor: 'pointer' }}>
            <Item status={getStatusColor(color_params)}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#fff", color: "#696969" }} >
                            {room.roomNumber.unit}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Quarto ${index + 1}`}
                        secondary={getLayout(room)}
                    />
                </ListItem>
                <p style={{
                    position: "absolute",
                    right: 4,
                    bottom: 0,
                    color: is_occupancy ? "#4d6cfd4a" : 'red',
                    fontSize: 12,
                    fontWeight: "bold"
                }}>
                    min: {occupancy.min}, max: {occupancy.max}
                </p>
            </Item>
        </Grid>)
}

function getLayout(room: RoomCorporate) {
    const chd = room.chd.join(', ');
    const pet = room.pet.join(', ');
    return <>
        {!!room.adt && <p><b>ADT:</b> {room.adt}</p>}
        {room.chd.length > 0 && <p><b>CHD:</b> {room.chd.length} [ {chd} ]</p>}
        {room.pet.length > 0 && <p><b>PET:</b> {room.pet.length} [ {pet} ]</p>}
    </>
}

export default UHCorporateCard