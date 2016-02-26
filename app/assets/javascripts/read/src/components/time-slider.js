

import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import scale from './collection-scale';


import {
  setDateRange,
  unsetDateRange,
} from '../events/time-slider';


@connect(state => ({
  geojson: state.collections.geojson
}))
export default class extends Component {


  static propTypes = {
    geojson: PropTypes.object,
  };


  /**
   * Create slider when mounted.
   */
  componentDidMount() {

    this.draw();

    // Re-render on resize.
    let resize = _.debounce(this.draw.bind(this), 500);
    $(window).on('resize.time', resize);

  }


  /**
   * Re-render when the collections change.
   */
  componentDidUpdate() {
    this.draw();
  }


  /**
   * Clear the date range when unmounted.
   */
  componentWillUnmount() {

    unsetDateRange();

    // Unbing the resize listener.
    $(window).off('resize.time');

  }


  /**
   * Render the time slider.
   */
  render() {
    return (
      <div id="time-slider">
        <div ref="slider"></div>
      </div>
    );
  }


  /**
   * Build the time slider.
   */
  draw() {

    if (!this.props.geojson) return;

    // Clear existing <svg>.
    let container = d3.select(this.refs.slider);
    container.select('svg').remove();

    // Measure the container.
    let w = container.node().getBoundingClientRect().width;
    let h = 50;

    let timeExtent = [
      new Date(2000, 1, 1),
      new Date(2016, 1, 1),
    ];

    let svg = container.append('svg')
      .attr('width', w)
      .attr('height', h);

    let context = svg.append('g')
      .classed('context', true);

    let xScale = d3.time.scale()
      .range([0, w])
      .domain(timeExtent);

    this.brush = d3.svg.brush()
      .on('brush', this.onBrush.bind(this))
      .x(xScale);

    // Render the collections.
    context.selectAll('circle.collection')

      .data(this.props.geojson.features)
      .enter()
      .append('circle')

      // Distinguish no-count markers.
      .classed({
        collection: true,
        nocount: function(d) {
          return !d.properties.num_graves;
        }
      })

      // X-axis offset.
      .attr('transform', function(d) {
        let date = new Date(d.properties.notice.deadline);
        return `translate(${xScale(date)},${h/2})`
      })

      // Radius.
      .attr('r', function(d) {
        return scale(d.properties.num_graves) * 0.5;
      });

    // Render the brush.
    context.append('g')
      .attr('class', 'x brush')
      .call(this.brush)
      .selectAll('rect')
      .attr('height', h);

  }


  /**
   * When the brush is changed.
   */
  onBrush() {
    let [start, end] = this.brush.extent();
    setDateRange(start, end);
  }


}
