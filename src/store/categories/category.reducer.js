import * as t from "./category.types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case t.SET_CATEGORIES:
      return {
        ...state,
        categories: payload
      };

    default:
      return state;
  };
};