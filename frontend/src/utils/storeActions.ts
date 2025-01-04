import store from "./store";
import * as constants from "./constants";

export function addState(name: string, value: unknown) {
    return store.dispatch({ type: constants.ADD_STATE, payload: { name, value } });   
}

export function removeState(name: string) {
    return store.dispatch({ type: constants.REMOVE_STATE, payload: { name } });
}

export function updateState(name: string, value: unknown) {
    return store.dispatch({ type: constants.UPDATE_STATE, payload: { name, value } });
}
