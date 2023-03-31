import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./category.types";

export const fetchCategoriesStart = () => createAction(t.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(t.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => createAction(t.FETCH_CATEGORIES_FAILED, error);
