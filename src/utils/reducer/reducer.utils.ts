import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// now using function overloading => will return a different type of action depending on the number of parameters
// with function overloading, each function must TAKE IN the same number of parameters but they can return unneeded ones as void

// first function signature for the createAction function, returns an object of type Action<T>
export function createAction<T extends string>(type: T, payload: void): Action<T>; // payload: void == doesn't return a payload

// second function signature for the createAction function, returns an object of type ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// implementation of the createAction function, called when createAction is invoked with either of the 2 signatures above
// the function is overloaded so that it can return different types depending on the number of provided arguments
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
};

// the function above is the same as the function below, but it uses function declaration along with types instead of arrow function declaration
// export const createAction = (type, payload) => ({ type, payload });