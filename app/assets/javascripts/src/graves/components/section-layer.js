

import React, { Component, PropTypes } from 'react';
import L from 'leaflet';


export default class extends Component {


  static contextTypes = {
    map: PropTypes.object.isRequired
  }


  static propTypes = {
    // TODO
  }


  /**
   * Add the section.
   */
  componentWillMount() {
    console.log(this.props);
  }


  render() {
    return null;
  }


}