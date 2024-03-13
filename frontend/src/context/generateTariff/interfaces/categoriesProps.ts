interface CategoriesProps {
    category: {
        id: string;
        name: string;
    };
    category_id: string;
    id: string;
    minimum_occupancy: number;
    maximum_occupancy: number;
}
export type CategoryOptionsStringProps =
    | "padrão"
    | "padrão varanda"
    | "luxo"
    | "luxo conjugado"
    | "luxo com hidro";

export interface CategoryOptionsProps {
    label: string;
    unit: string;
    category: string;
}

export default CategoriesProps