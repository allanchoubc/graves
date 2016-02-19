

import React, { Component } from 'react';

import BaseLayerSelect from './base-layer-select';
import WmsLayerSelect from './wms-layer-select';


export default class extends Component {


  /**
   * Render the map burger menu.
   */
  render() {
    return (
      <div id="map-menu">
        <BaseLayerSelect />
        <WmsLayerSelect />
      </div>
    );
  }


}