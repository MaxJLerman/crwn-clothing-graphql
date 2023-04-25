import { AnyAction } from "redux";

import { Category } from "./category.types";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";

// readonly is necessary because the values below must never be modified
// this is because with reducers, you never modify the original state => must always spread over and create a new state
export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};


const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true
    };
  };

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false
    };
  };

  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    };
  };

  return state; // if none match, return the default state
};