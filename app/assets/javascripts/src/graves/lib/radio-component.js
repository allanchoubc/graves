

import _ from 'lodash';
import React, { Component } from 'react';
import Radio from 'backbone.radio';


export default class extends Component {


  /**
   * Bind local channel, initialize.
   *
   * @param {Object} props
   */
  constructor(props) {

    super(props);

    let name = this.constructor.channelName;

    // Set local channel.
    if (_.isString(name)) {
      this.channel = Radio.channel(name);
    } else {
      throw new Error('Missing channel.');
    }

  }


  /**
   * Bind event / request mappings.
   */
  componentDidMount() {
    this._bindRequests();
    this._bindEvents();
  }


  /**
   * Bind event mappings.
   */
  _bindEvents() {

    _.each(this.constructor.events, (bindings, channelName) => {

      // Connect to channel.
      let channel = Radio.channel(channelName);

      // Bind events -> callbacks.
      _.each(bindings, (method, event) => {
        channel.on(event, this[method], this);
      });

    });

  }


  /**
   * Bind request mappings to the local channel.
   */
  _bindRequests() {

    // Bind requests -> callbacks.
    _.each(this.constructor.requests, (method, request) => {
      this.channel.reply(request, this[method], this);
    });

  }


}