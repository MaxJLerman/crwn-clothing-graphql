import { createAction } from "../../utils/reducer/reducer.utils";
import { SET_CATEGORIES_MAP } from "../../constants/categoryActionTypes";

export const setCategoriesMap = (categoriesMap) => createAction(SET_CATEGORIES_MAP, categoriesMap);