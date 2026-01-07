import {Get} from "../server";

export interface SubcategoryVO {
    subcategory_id: number;
    subcategory_name: string;
}

export const acquireAllSubcategory = () => {
    return Get("/subcategory/acquire/all");
}

export const subcategoryApi = {
    acquireAllSubcategory
}