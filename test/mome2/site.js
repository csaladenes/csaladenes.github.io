mapboxgl.accessToken = 'pk.eyJ1IjoiYWoiLCJhIjoiY2loN3g1YWh0MHQ2OXV1a2k2eGtzeDhiayJ9.WbVSgpJDUjhaM2L0qdMJ2w';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/aj/cievxpmc00wsmqam3dqntax4o', //stylesheet location
  hash: true,
  logoPosition: 'bottom-right'
});

map.fitBounds([[-48.06, -19.49], [24.90, 18.68]]);

map.scrollZoom.disable();

map.once('style.load', start);

function start() {

  var margin = { top: 30, right: 20, bottom: 20, left: 20 };

  var startYear = 1979,
    endYear = 2016,
    initialYear = 1979;

  map.addControl(new mapboxgl.NavigationControl());

  var years = d3.range(startYear, endYear + 1);

  // ice area graph
  // source: ftp://sidads.colorado.edu/DATASETS/NOAA/G02135/seaice_analysis/
  var iceArea = d3.zip(years, [
    7.22,
    7.86,
    7.25,
    7.45,
    7.54,
    7.11,
    6.94,
    7.55,
    7.51,
    7.53,
    7.08,
    6.27,
    6.59,
    7.59,
    6.54,
    7.24,
    6.18,
    7.91,
    6.78,
    6.62,
    6.29,
    6.36,
    6.78,
    5.98,
    6.18,
    6.08,
    5.59,
    5.95,
    4.32,
    4.74,
    5.39,
    4.93,
    4.63,
    3.63,
    5.35,
    5.29,
    4.68,
    4.72]);

  // temperature data
  // source: https://climate.nasa.gov/vital-signs/global-temperature/
  var tempAnomaly = d3.zip(years, [0.23,
    0.26,
    0.3,
    0.18,
    0.34,
    0.15,
    0.13,
    0.23,
    0.37,
    0.38,
    0.3,
    0.43,
    0.4,
    0.26,
    0.28,
    0.34,
    0.46,
    0.32,
    0.52,
    0.63,
    0.44,
    0.42,
    0.54,
    0.59,
    0.61,
    0.57,
    0.66,
    0.61,
    0.61,
    0.54,
    0.63,
    0.7,
    0.57,
    0.62,
    0.66,
    0.74,
    0.87,
    0.99]);

  var tempAnomalyValues = tempAnomaly.reduce(function(memo, item) {
    memo[item[0]] = item[1].toFixed(2);
    return memo;
  }, {});

  var iceAreaValues = iceArea.reduce(function(memo, item) {
    memo[item[0]] = item[1].toFixed(2);
    return memo;
  }, {});

  var startWidth = Math.min(window.innerWidth, 420);
  var width = startWidth - margin.left - margin.right;
  var height = 180 - margin.top - margin.bottom;

  var yearScale = d3.scale.linear()
    .domain([startYear, endYear])
    .range([0, width])
    .clamp(true);

  var iceScale = d3.scale.linear()
    .domain(d3.extent(iceArea, function(d) { return d[1]; }))
    .range([height, 0]);

  var tempScale = d3.scale.linear()
    .domain(d3.extent(tempAnomaly, function(d) { return d[1]; }))
    .range([height, 0]);

  var yearIndicator = d3.select('#year-indicator');
  var coverValue = d3.select('.cover');
  var anomalyValue = d3.select('.anomaly');

  function setYear(year) {
    map.setFilter('Ice Extent', ['==', 'year', year]);
    yearIndicator.text(year);
    coverValue.html(iceAreaValues[year] + ' million km<sup>2</sup>');
    anomalyValue.text(tempAnomalyValues[year] + '°C above norm');
  }

  var ice = d3.svg.line()
    .x(function(d) { return yearScale(d[0]); })
    .y(function(d) { return iceScale(d[1]); })
    .interpolate('basis');

  var temp = d3.svg.line()
    .x(function(d) { return yearScale(d[0]); })
    .y(function(d) { return tempScale(d[1]); })
    .interpolate('basis');

  var xAxis = d3.svg.axis()
    .scale(yearScale)
    .tickSize(-height)
    .tickFormat(String);

  //draw ice extent line
  var svgElem = d3.select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  var svg = svgElem
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg
    .append('path')
    .datum(iceArea)
    .attr('class', 'line ice')
    .attr('d', ice);

  //draw temp line
  svg
    .append('path')
    .datum(tempAnomaly)
    .attr('class', 'line temp')
    .attr('d', temp);

  var brush = d3.svg.brush()
    .x(yearScale)
    .extent([initialYear, initialYear])
    .on('brush', brushed);

  var slider = svg.append('g')
    .attr('class', 'slider')
    .call(brush);

  slider.selectAll('.extent,.resize,.background')
    .remove();

  var handle = slider.append('g')
    .attr('transform', 'translate(0,' + -8 + ')');

  handle.append('circle')
    .attr('class', 'handle')
    .attr('r', 7);


  handle.append('path')
    .attr('d','M0,0L0,' + height)
    .attr('transform', 'translate(0, 8)')
    .attr('class', 'indicator');

  svgElem.on('click', function() {
    var value = yearScale.invert(d3.mouse(svg.node())[0]);
    slider
      .call(brush.event)
      .transition()
        .duration(600)
        .call(brush.extent([value, value]))
        .call(brush.event);
  });

  function brushed() {
    var value = brush.extent()[0];
    if (d3.event.sourceEvent) { // not a programmatic event
      d3.select('.hide-hint').remove();
      value = yearScale.invert(d3.mouse(this)[0]);
      brush.extent([value, value]);
    }

    handle.attr('transform', 'translate(' + yearScale(value) + ',-8)');

    var year = Math.round(value);

    //move indicator needle
    setYear(year);
  }

  d3.selectAll('.line').style('stroke-dashoffset', '0');

  document.body.addEventListener('mousemove', intro);

  function intro() {
    document.body.removeEventListener('mousemove', intro);
    slider
      .call(brush.event)
      .transition()
        .duration(7000)
        .call(brush.extent([endYear, endYear]))
        .call(brush.event);
  }
}
