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

chart.initializing.then((chart) => {
  return chart.animate({ //State 1 - Drawing a static column chart
    data: data,
    descriptor: {
      channels: {
        x: {
          attach: ['x_axis_imd_rank'],
          range: '0,1.1,%'
        }, // Adding the Timeseries to the x-axis
        y: {
          attach: ['y_axis_allcat_rank'],
          range: '0,1.1,%'
        }, // Adding the Values 1 to the y-axis & setting the range from 0 to 110% of the biggest value in the series
        label: {
          attach: ['local_authorities']
        }, //Adding the same data series to the label channel, so that the values will be shown on the bars.

      },
      title: 'Levelling up', //Setting the chart title
      // legend: null, // Turning off the legend
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
    }, //Set the labels to show on top of the bars.

  })
});