

import React from 'react';
import classNames from 'classnames';

import Component from './component';


export default class extends Component {


  /**
   * Render a loading spinner.
   */
  render() {

    let cx = classNames(
      'fa',
      'fa-spinner',
      'fa-spin'
    );

    return (
      <div className="spinner">
        <i className={cx}></i>
        <p>Loading &#8230;</p>
      </div>
    );

  }


}
