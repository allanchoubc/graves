

import L from 'leaflet';
import React, { PropTypes } from 'react';
import Mousetrap from 'mousetrap';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/editor';
import Component from './component';
import CopyLonLat from './copy-lonlat';
import CollectionGroup from './collection-group';
import CollectionModal from './collection-modal';
import CollectionLegend from './collection-legend';
import CountyGroup from './county-group';
import SectionGroup from './section-group';
import MapLine from './map-line';
import CDCPicker from './cdc-picker';
import MiniMap from './mini-map';

import {
  MAP,
  FOCUS_MAP,
} from '../constants';


@connect(
  state => ({
    editing: state.editor.active
  }),
  actions
)
export default class extends Component {


  static requests = {
    [MAP]: {
      [FOCUS_MAP]: 'focus'
    }
  }


  static childContextTypes = {
    map: PropTypes.object
  }


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = { map: null };
  }


  /**
   * Expose the map instance to children.
   */
  getChildContext() {
    return {
      map: this.state.map
    };
  }


  /**
   * Spin up the Leaflet instance.
   */
  componentDidMount() {
    this._initLeaflet();
    this._listenForEdit();
  }


  /**
   * Spin up the Leaflet instance.
   */
  _initLeaflet() {

    let el = findDOMNode(this.refs.map);

    let map = L.map(el, {
      zoomControl: false,
      attributionControl: false,
      fadeAnimation: false,
      scrollWheelZoom: false,
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    map.addControl(zoomControl);

    // OSM base layer.
    let osmLayer = L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    map.addLayer(osmLayer);

    // Default viewport.
    map.setView([30, 115], 5);

    this.setState({ map: map });

  }


  /**
   * Toggle edit mode with control+e.
   */
  _listenForEdit() {
    Mousetrap.bind(['command+e', 'ctrl+e'], () => {
      this.props.toggleEditor();
    });
  }


  /**
   * Render the map container.
   */
  render() {
    return (
      <div className="map-wrapper">
        <div id="map" ref="map"></div>
        {this.getBehaviors()}
      </div>
    );
  }


  /**
   * Render map behaviors.
   *
   * @return {Leaflet.Map}
   */
  getBehaviors() {

    let behaviors = null;

    if (this.state.map) {
      behaviors = (
        <span>

          <CollectionGroup />
          <CollectionModal />
          <CollectionLegend />
          <CountyGroup />
          <SectionGroup />

          <MapLine />
          <CDCPicker />
          <MiniMap />

          {
            this.props.editing ?
            <CopyLonLat /> : null
          }

        </span>
      );
    }

    return behaviors;

  }


  /**
   * Expose the Leaflet instance.
   *
   * @param {Number} lon
   * @param {Number} lat
   * @param {Number} zoom
   */
  focus(lon, lat, zoom=8) {
    this.state.map.flyTo([lat, lon], zoom, {
      duration: 1.5
    });
  }


}
