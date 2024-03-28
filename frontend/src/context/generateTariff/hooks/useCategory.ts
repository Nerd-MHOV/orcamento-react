import { useEffect, useState } from "react";
import CategoriesProps, { CategoryOptionsProps } from "../interfaces/categoriesProps";
import { occupancyInitial } from "../initial";
import OccupancyProps from "../interfaces/occupancyProps";
import serialize from "form-serialize";
import { getCategoryOptions } from "../functions/getters/getCategoryOptions";

const useCategory = () => {
    const [categoryValue, setCategoryValue] =
        useState<CategoryOptionsProps | null>(null);
    const [occupancy, setOccupancy] = useState<OccupancyProps>(occupancyInitial);
    const [occupancyWrong, setOccupancyWrong] = useState(false);
    const [categoriesCorporateValues, setCategoriesCorporateValues] =
        useState<CategoryOptionsProps[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<
        CategoryOptionsProps[]
    >([]);
    const [allCategories, setAllCategories] = useState<CategoriesProps[]>([]);
    const [unitUsing, setUnitUsing] = useState<string[]>([]);


    const handleCategoriesCorporateInput = (newValue: CategoryOptionsProps[]) => {
        setCategoriesCorporateValues(newValue);
    }
    const handleCategoryInput = (newValue: CategoryOptionsProps | null) => {
        setCategoryValue(newValue);

        // Adjust occupancy values, number of people in the room
        if (newValue) {
            const occupancy = getOccupancyUH(newValue)
            setOccupancy(occupancy);
            changeOccupancyWrong(occupancy);
        };
    };
    function getOccupancyUH(housingUnit: CategoryOptionsProps) {
        let category = allCategories.filter((arr) => arr?.id === housingUnit.unit);
        return {
            text: `${category[0].id} - min: ${category[0].minimum_occupancy}, max: ${category[0].maximum_occupancy}`,
            max: category[0].maximum_occupancy,
            min: category[0].minimum_occupancy,
            category: housingUnit.category,
        };
    }
    function changeOccupancyWrong(parOccupancy?: OccupancyProps) {
        if (!parOccupancy) parOccupancy = occupancy;
        const formUp: HTMLFormElement | null = document.querySelector("#form");
        if (!formUp) return;
        const responseForm = serialize(formUp, { hash: true });
        const childValue = JSON.parse(responseForm?.child as string || "[]");
        let adult = responseForm.adult;
        let child = childValue.length;
        let paq = Number(adult) + child;
        if (paq > parOccupancy.max || paq < parOccupancy.min) {
            setOccupancyWrong(true);
        } else {
            setOccupancyWrong(false);
        }
    }

    async function getVariables() {
        const resCategory = await getCategoryOptions();
        setAllCategories(resCategory.response);
        setCategoryOptions(resCategory.list);
    }
    useEffect(() => {
        getVariables();
    }, [])
    return ({
        occupancy,
        occupancyWrong,
        changeOccupancyWrong,
        getOccupancyUH,
        categoryValue,
        categoriesCorporateValues,
        handleCategoryInput,
        handleCategoriesCorporateInput,
        categoryOptions,
        unitUsing,
        setUnitUsing,
    })
}

export default useCategory