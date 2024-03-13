import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, {useContext} from "react";
import {GenerateTariffContext, useGenerateTariff} from "../../context/generateTariff/generateTariff";
import UHCorporateCard from './UHCorporateCard';
import ModalRoomLayout from './ModalRoomLayout';
import { CategoryOptionsProps } from '../../context/generateTariff/interfaces/categoriesProps';

export const ListUHsCorporate = ()=> {
    const {
        categoriesCorporateValues,
        getOccupancyUH
    } = useGenerateTariff();

    
    const [open, setOpen] = React.useState(false);
    const [roomBeingEdited, setRoomBeingEdited] = React.useState<CategoryOptionsProps | null>(null);

    const handleClickOpen = (category: CategoryOptionsProps) => {
      setRoomBeingEdited(category)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
  
    return (
        <>
        <ModalRoomLayout 
            open={open}
            handleClose={handleClose}
            room={roomBeingEdited}
        />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{"max-width": "800px", padding: "20px"}}>
                {categoriesCorporateValues.map((category, index) => 
                <UHCorporateCard 
                    category={category}
                    index={index}
                    key={index}
                    occupancy={getOccupancyUH(category)}
                    onClick={() => {
                        handleClickOpen(category)
                    }}
                />
                )}
            </Grid>
        </Box>
        </>
    );
}