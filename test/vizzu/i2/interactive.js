import Vizzu from 'https://vizzuhq.github.io/vizzu-beta-release/0.2.0/vizzu.js';
import {
  data
  // } 
  // from 'https://vizzuhq.github.io/vizzu-beta-release/example-data/trump_data.js';
  // }
  // from 'https://vizzuhq.github.io/vizzu-beta-release/example/tutorial/tutorial-data.js';
}
from '../data.js';

const chart = new Vizzu('testVizzuCanvas');

let slider = document.getElementById("myRange");

slider.oninput = (e) => {
  let t = e.target.value;
  chart.animation.pause();
  chart.animation.seek(t / 10 + '%');

};

chart.initializing.then(() => {
  return chart.animate({ // step1
    data: data,
    descriptor: {
      channels: {
        x: {
          attach: ['quadrant'],
        }, // Adding the Timeseries to the x-axis
        y: {
          attach: ['y_axis_allcat_rank'],
          range: '0,1.1,%'
        }, // Adding the Values 1 to the y-axis & setting the range from 0 to 110% of the biggest value in the series
        label: {
          attach: ['quadrant']
        }, //Adding the same data series to the label channel, so that the values will be shown on the bars.
        color: {
          attach: ['quadrant']
        }
      },
      title: 'Init plot',
      legend: "color", //Switching on the legend
    },

    style: {
      plot: {
        marker: {
          label: {
            position: 'above',
            filter: 'lightness(0.1)'
          }
        }
      }
    }, //Change the labels' position to the center of the markers so that all three are visible in each bar.

  });
}).then((chart) => {
  return chart.animate({ //step2
    descriptor: {
      channels: {
        y: {
          attach: ['local_authorities'],
          range: '0,1.1,%'
        }, // Adding the Values 1 to the y-axis & setting the range from 0 to 110% of the biggest value in the series
        label: {
          attach: ['local_authorities'],
          detach: ['quadrant']
        },
        color: {
          attach: ['quadrant']
        }

      },
      title: 'Levelling up', //Setting the chart title
      // geometry: 'circle',
    },

  }, {
    delay: '0s',
  });
}).then(() => {
  return chart.animate({ // State 2 - The first animation
    data: {
      filter: record => record["quadrant"] == 'quadrant 1' || record["quadrant"] == 'quadrant 3',
    },
    descriptor: {
      channels: {
        x: {
          attach: ['local_authorities'],
        }, //Adding the same date series to the color channel, resulting in a stacked bar chart with different colors used for the different categories on the y axis.
        y: {
          detach: ['local_authorities'],
        },
      },
      title: 'Color by region',
      geometry: 'circle',
    },

  }, {
    delay: '2s',
  });
}).then(() => {
  return chart.animate({ // State 2 - The first animation
    descriptor: {
      channels: {
        color: {
          attach: ['supergroup_name'],
          detach: ['region']
        }, //Adding the same date series to the color channel, resulting in a stacked bar chart with different colors used for the different categories on the y axis.
      },
      title: 'Color by group',
    },

  }, {
    delay: '2s',
  });
})