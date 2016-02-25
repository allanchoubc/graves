

import { createReducer } from '../utils';


import {
  TOGGLE_MAP_MENU,
  TOGGLE_TIME_SLIDER,
} from '../constants';


const initialState = {
  mapMenu: false,
  timeline: false,
};


const handlers = {

  [TOGGLE_MAP_MENU]: (state, action) => ({
    mapMenu: action.show,
  }),

  [TOGGLE_TIME_SLIDER]: (state, action) => ({
    timeline: action.show,
  }),

};


export default createReducer(initialState, handlers);
