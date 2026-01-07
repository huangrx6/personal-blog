import { documentApi } from "./path/document"
import {subcategoryApi} from "./path/subcategory";
import {dailyApi} from "./path/daily";

export const api = {
    ...documentApi,
    ...subcategoryApi,
    ...dailyApi
}