import { CategoryOptionsProps } from "../../context/generateTariff/interfaces/categoriesProps"
import { occupacyUHProps } from "../../context/generateTariff/interfaces/generateTariffContextProps"
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {useContext} from "react";
import {GenerateTariffContext} from "../../context/generateTariff/generateTariff";
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";


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
    category: CategoryOptionsProps,
    onClick?: VoidFunction
} 
const UHCorporateCard = ({occupancy, index, category, onClick}: UHCorporateCardProps) => {

    return (
    <Grid item xs={2} sm={4} md={4} key={index} onClick={onClick}>
        <Item  status={getStatusColor("completed")}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar sx={{bgcolor: "#fff", color: "#696969"}} >
                        {category.unit}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary={`Quarto ${index + 1}`} 
                    secondary="2 ADT, 0 CHD, 2 PET"  
                />
            </ListItem>
            <p style={{
                position: "absolute",
                right: 4,
                bottom: 0,
                color: "rgba(77,108,253,0.29)",
                fontSize: 12,
                fontWeight: "bold"
            }}>
                min: {occupancy.min}, max: {occupancy.max}
            </p>
        </Item>
    </Grid>)
}


export default UHCorporateCard