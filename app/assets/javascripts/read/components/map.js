

import { findDOMNode } from 'react-dom';
import React, { Component } from 'react';
import L from 'leaflet';

import config from './map.yml';
import CollectionMarkers from './collection-markers';
import MapMenu from './map-menu';


export default class extends Component {


  /**
   * Set initial state.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    this.state = {
      map: null,
    };

  }


  /**
   * Start the map.
   */
  componentDidMount() {
    this.createMap();
  }


  /**
   * Spin up the Leaflet instance.
   */
  createMap() {

    let el = findDOMNode(this.refs.leaflet);

    let map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: false,
      fadeAnimation: false,
    });

    // Zoom buttons on top right.
    let zoomControl = L.control.zoom({
      position: 'topright'
    });

    map.addControl(zoomControl);

    // OSP base layer.
    let osmLayer = L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
      { detectRetina: true }
    );

    map.addLayer(osmLayer);

    // Default viewport.
    let { lat, lng, zoom } = config.focus;
    map.setView([lat, lng], zoom);

    // Mount behaviors.
    this.setState({ map });

  }


  /**
   * Render the map container.
   */
  render() {
    return (
      <div id="map">

        <div id="leaflet" ref="leaflet">
        </div>

        {this.state.map ? (
          <behaviors>

            <CollectionMarkers map={this.state.map} />
            <MapMenu />

          </behaviors>
        ) : null}

      </div>
    );
  }


}
