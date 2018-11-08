import * as d3 from '../../../node_modules/d3';

// svg object at root.
let svg = {};
let tooltip = {};
let scale = {};

const fetchData = function fetchData(condition) {
  return new Promise((resolve, reject) => {
    d3.csv(`https://s3-ap-northeast-1.amazonaws.com/font-map/csv/${condition}.csv`)
      .then((datapoints, error) => {
        if (error) {
          reject();
        } else {
          resolve(datapoints);
        }
      });
  });
};

// draw font map
const drawMap = function drawMap(data, stext) {
  const area = svg
    .select('g')
    .selectAll('.fontNode')
    .data(data)
    .enter();

  // add text sample node
  area
    .append('text')
    .attr('x', d => scale(d.x))
    .attr('y', d => scale(d.y) - 180)
    .text(stext)
    .attr('text-anchor', 'middle')
    .attr('font-family', d => d.fontName)
    .attr('font-style', d => d.style)
    .attr('font-weight', d => d.weight)
    .attr('width', '30px')
    .attr('height', '30px')
    .attr('font-size', '40px');

  const circle = area
    .append('circle')
    .attr('cx', d => scale(d.x))
    .attr('cy', d => scale(d.y) - 200)
    .attr('r', 15)
    .style('opacity', 0);

  // add tooltip
  circle.on('mouseover', (d) => {
    tooltip.transition()
      .duration(200)
      .style('opacity', 1);
    tooltip
      .style('left', `${d3.event.pageX - 100}px`)
      .style('top', `${d3.event.pageY - 150}px`)
      .select('div.el-card')
      .select('div.el-card__header')
      .select('div.clearfix')
      .select('span')
      .html(d.fontName)
      .style('font-family', d.fontName)
      .style('font-style', d.style)
      .style('font-weight', d.weight);
  }).on('mouseout', () => {
    tooltip
      .style('left', '-200px')
      .style('top', '-100px')
      .transition()
      .duration(50)
      .style('opacity', 0);
  });
};

// initialize d3 map with zoom and background
const init = function init() {
  // initialize svg object
  svg = d3.select('body')
    .select('#app')
    .select('#font-map-home')
    .select('div.font-map-home-wrapper')
    .select('#fontMap')
    .select('svg');

  // initialize tool tip
  tooltip = d3.select('body')
    .select('#app')
    .select('#font-map-home')
    .select('div.font-map-home-wrapper')
    .select('#toolTip');

  // initialize linear scale
  scale = d3.scaleLinear()
    .domain([-20, 15])
    .range([100, 1600]);

  const svgInit = svg
    .attr('width', '100%')
    .attr('height', '100%');

  // add background
  svgInit.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', '#EDF8F6');

  // zoomable area.
  const map = svgInit.call(d3.zoom().on('zoom', () => {
    map.attr('transform', d3.event.transform);
  }))
    .append('g');

  map.append('rect')
    .attr('width', '1920')
    .attr('height', '1080')
    .attr('fill', '#EDF8F6');

  fetchData('weight').then((datapoints) => {
    drawMap(datapoints, 'A');
  }).catch((err) => {
    throw (err);
  });
};

const clear = function clear() {
  svg.select('g')
    .selectAll('text')
    .remove();
};

// reset d3 view
const refresh = function refresh() {
  clear();
  fetchData('weight').then((datapoints) => {
    drawMap(datapoints, 'A');
  }).catch((err) => {
    throw (err);
  });
};

export default {
  name: 'FontMapD3',
  init,
  refresh,
  fetchData,
  drawMap,
  clear,
};
