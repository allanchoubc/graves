

import * as constants from '../constants';
import createReducer from '../utils/create-reducer';


const initialState = {
  loading: false,
  features: [],
  layers: {},
  highlighted: null,
  selected: null,
};


const handlers = {

  [constants.REQUEST_COLLECTIONS]: (state, action) => ({
    loading: true,
  }),

  [constants.RECEIVE_COLLECTIONS]: (state, action) => ({
    features: action.geojson.features,
    loading: false,
  }),

  [constants.RENDER_COLLECTIONS]: (state, action) => ({
    layers: action.layers,
  }),

  [constants.HIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: action.id,
  }),

  [constants.UNHIGHLIGHT_COLLECTION]: (state, action) => ({
    highlighted: null,
  }),

};


export default createReducer(initialState, handlers);
