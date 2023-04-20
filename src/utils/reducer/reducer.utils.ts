import { AnyAction } from 'redux';

// type predicate ~ function that verifies whether a specific argument it receives is going to be a more specific type or not

// 1) intersection type == types made from multiple other types that adopt all of the respective props found in each singular one
//    eg type Intersection<T, U> = T & U;
// 2) return type == determines what the return type of the function is going to be
// 3) use intersection and return types to create matchable types
//    matchable types are an extension on the action creator
type Matchable<AC extends () => AnyAction> = AC & { // AC == (generic) action creator
  type: ReturnType<AC>['type']; // reaches into action => gets type off that value => sets type on that value
  match(action: AnyAction): action is ReturnType<AC>; // returns true if the passed action matches it's expected type, else false
};

// first signature
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>; // no parameters

// second signature
// ...args: any[] == take all the arguments and concat them into an array of anything
// this is the one place I can cast as any
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string }>(actionCreator: AC): Matchable<AC>; // has parameters

// utility function to extract type coming off action creator => use type so action creator functions can match actions inside reducer
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type; // there must be a type value because the above action creator functions return some action
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    } // if matches, action: AnyAction => action: [return type of action creator]
  });
};



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