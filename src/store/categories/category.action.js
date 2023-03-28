import { createAction } from "../../utils/reducer/reducer.utils";
import { SET_CATEGORIES } from "../../constants/categoryActionTypes";

export const setCategories = (categoriesArray) => createAction(SET_CATEGORIES, categoriesArray);