

import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as actions from '../actions/wms-layer';


@connect(
  state => state.wmsLayer,
  actions,
)
export default class extends Component {


  static propTypes = {
    changeWmsLayer: PropTypes.func.isRequired,
  };


  /**
   * Render the base layer select.
   */
  render() {

    let options = _.map(window.GRAVES.wmsLayers, function(layer) {
      return {
        value: layer.id,
        label: layer.name,
      };
    });

    return (
      <Select

        options={options}

        onChange={this.onChange.bind(this)}
        value={this.props.layerId}

      />
    );

  }


  /**
   * When the base layer is changed.
   *
   * @param {Object} option
   */
  onChange(option) {
    let id = option ? option.value : null;
    this.props.changeWmsLayer(id);
  }


}
