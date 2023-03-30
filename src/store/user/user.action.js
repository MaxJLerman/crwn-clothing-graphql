import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./user.types";

export const setCurrentUser = (user) => createAction(t.SET_CURRENT_USER, user);
