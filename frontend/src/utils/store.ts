import { createStore } from "redux";
import * as constants from './constants';

interface State {
  name: string;
  value: string;
}

interface Action {
  type: string;
  payload: State;
}

function reducer(state: State[] = [], action: Action): State[] {
  switch (action.type) {
    case constants.ADD_STATE:
      return [...state, action.payload];
    
    case constants.REMOVE_STATE:
      return state.filter((item) => item.name !== action.payload.name);
    
    case constants.UPDATE_STATE:
      return state.map((item) => {
        if (item.name === action.payload.name) {
          item.name = action.payload.name;
          item.value = action.payload.value;
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    
    default:
      return state;
  }   
}


const store = createStore(reducer);

export default store;