import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES } from "../../constants/constants";

export const fetchCategoriesStart = () => createAction(t.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(t.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => createAction(t.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments(CATEGORIES);
    dispatch(fetchCategoriesSuccess(categoriesArray));
  }

  catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};