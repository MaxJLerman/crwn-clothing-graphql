import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// function* == generator function
export function* fetchCategoriesAsync() {
  try {
    // call() method takes in 2 arguments: callable method as a variable & parameters
    // i.e. call the getCategoriesAndDocuments() method and pass in the "categories" string
    const categoriesArray = yield* call(getCategoriesAndDocuments); // yield ≈ await
    yield* put(fetchCategoriesSuccess(categoriesArray)); // put ≈ dispatch
  }

  catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  // takeLatest() == if multiple of the same actions are received, take the latest one
  yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
};

export function* categoriesSaga() {
  // all() prevents program from running subsequent lines of code until everything inside it finishes
  yield* all([call(onFetchCategories)])
};
