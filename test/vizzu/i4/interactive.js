import Vizzu from 'https://vizzuhq.github.io/vizzu-beta-release/0.2.0/vizzu.js';
import {
    data
}
from '../data.js';

const chart = new Vizzu('vizzuCanvas');

chart.initializing.then(() => {
    return chart.animate({ // step1
        data: data,
        descriptor: {
            channels: {
                x: {
                    attach: ['local_authorities']
                },
                y: {
                    attach: ['one'],
                    title: ' ',
                },
            },
            title: 'These are all local authorities of England',
            // sort: 'none',
            // split: true
        },
    });
}).then(() => {
    return chart.animate({ // step2
        descriptor: {
            channels: {
                x: {
                    detach: ['local_authorities'],
                    attach: ['levelling_up_categorisation', 'local_authorities'],
                    // title: 'TITLE',
                },
                color: {
                    attach: ['levelling_up_categorisation'],
                }
            },
            title: "Grouped Levelling Up Fund priority categories"
        },
    });
}).then(() => {
    return chart.animate({ // step3
        descriptor: {
            channels: {
                y: {
                    detach: ['one'],
                    attach: ['x_axis_imd_rank'],
                    title: 'Deprivation'
                }
            },
            title: 'And ranked by deprivation'
        },
    });
}).then(() => {
    return chart.animate({ // step4
        descriptor: {
            geometry: 'circle',
            title: "It's a good match"
        },
    });
}).then(() => {
    return chart.animate({ // step5
        descriptor: {
            channels: {
                label: {
                    attach: ['local_authorities']
                },
                x: {
                    detach: ['levelling_up_categorisation',
                        'local_authorities'
                    ],
                    attach: ['y_axis_allcat_rank']
                }
            },
            title: "But if ranked on COVID economic impact..."
        },
    });
}).then(() => {
    return chart.animate({ // step7
        descriptor: {
            channels: {
                y: {
                    detach: ['x_axis_imd_rank'],
                    attach: ['region', 'local_authorities']
                },
                x: {
                    // detach: ['y_axis_allcat_rank'],
                },
                color: {
                    detach: ['levelling_up_categorisation'],
                    attach: ['region']
                },
                label: {
                    detach: ['local_authorities']
                }
            },
            geometry: 'rectangle',
            title: "Some areas are clear outliers"
        },
    });
})