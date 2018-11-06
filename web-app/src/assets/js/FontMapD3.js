import * as d3 from '../../../node_modules/d3';

// svg object at root.
let svg = {};

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
const drawMap = function drawMap(data) {
  const text = svg
    .select('g')
    .selectAll('.fontNode')
    .data(data)
    .enter()
    .append('text');

  // add text sample node
  text.attr('x', d => d.x)
    .attr('y', d => d.y)
    .text('A')
    .attr('font-family', d => d.fontName)
    .attr('font-size', '40px');
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

  fetchData('combined').then((datapoints) => {
    drawMap(datapoints);
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
  fetchData('combined').then((datapoints) => {
    drawMap(datapoints);
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
