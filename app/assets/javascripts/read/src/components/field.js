

import _ from 'lodash';
import React, { PropTypes } from 'react';

import Component from './component';


export default class extends Component {


  static propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.any,
  };


  /**
   * Render a raw metadata field.
   */
  render() {
    return this.props.value ? (

      <div className="field">
        <span className="field">{this.props.field}</span>:{' '}
        <span className="value">{this.props.value}</span>
      </div>

    ) : null;
  }


}
