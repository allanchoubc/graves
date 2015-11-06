

import { Router } from 'director';
import { store } from '.';

import {
  showSplash,
  showNarrative,
  showExplore,
} from './actions/route';


export default Router({

  '/': () => {
    store.dispatch(showSplash());
  },

  '/read/:slug': slug => {
    store.dispatch(showNarrative(slug));
    console.log(slug);
  },

  '/explore': () => {
    store.dispatch(showExplore());
  },

});
