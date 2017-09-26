

import $ from 'jquery';

import {
  REQUEST_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  SELECT_COLLECTION,
  UNSELECT_COLLECTION,
} from '../constants';


/**
 * Load collections.
 */
export function loadCollections() {
  return dispatch => {

    // Notify start.
    dispatch(requestCollections());
    let slug = location.pathname.indexOf('/read/') == 0 && location.pathname.split('/read/')[1],
        data = slug ? {tag: slug} : {};

    $.getJSON('/api/collections.json', data, json => {
      dispatch(receiveCollections(json));
    })

  };
}


/**
 * When collections are requested.
 */
function requestCollections() {
  return {
    type: REQUEST_COLLECTIONS,
  };
}


/**
 * When collections are loaded.
 *
 * @param {Object} geojson
 */
function receiveCollections(geojson) {
  return {
    type: RECEIVE_COLLECTIONS,
    geojson,
  };
}


/**
 * Select a collection.
 *
 * @param {Object} feature
 */
export function selectCollection(feature, nearby) {
  return {
    type: SELECT_COLLECTION,
    feature: feature,
    nearby: nearby,
  };
}


/**
 * Unselect a collection.
 *
 * @param {Object} feature
 */
export function unselectCollection() {
  return {
    type: UNSELECT_COLLECTION,
  };
}
