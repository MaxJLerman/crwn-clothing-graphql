import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./category.types";

export const setCategories = (categoriesArray) => createAction(t.SET_CATEGORIES, categoriesArray);