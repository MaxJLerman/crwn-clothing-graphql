import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  return state.categories;
};

// memoized selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // input selector(s) - what do I want [slices] as parameters to be used to produce what the output selector(s) should return back
  (categoriesSlice) => categoriesSlice.categories // output selector(s) - output of input selector(s)
); // function returns categories array that lives on the categories slice of the redux state
   // function will only run when the selectCategoryReducer output changes, if not it will return previously calculated [cached] value

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesArray) => categoriesArray.reduce((accumulator, category) => {
    const { title, items } = category;
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {})
); // as long as categoriesArray does not change, the above method will not re-run
   // previously calculated value will be returned, which is much faster than re-reducing the array in runtime
