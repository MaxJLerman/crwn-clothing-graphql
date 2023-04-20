import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";

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
  action = {} as CategoryAction // this is called a discriminating union - should only accept actions of the 3 types specified
) => {
  // can no longer destructure the type and payload from the action because not all actions have a payload
  // const { type, payload } = action;
  // must use action.type and action.payload in thier respective places due to using TypeScript (see below)

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      };

    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  };
};