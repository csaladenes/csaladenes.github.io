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
                }
            }
        },
    });
}).then(() => {
    return chart.animate({ // step2
        descriptor: {
            channels: {
                x: {
                    detach: ['local_authorities'],
                    attach: ['levelling_up_categorisation', 'local_authorities']
                },
                color: {
                    attach: ['levelling_up_categorisation']
                }
            }
        },
    });
}).then(() => {
    return chart.animate({ // step3
        descriptor: {
            channels: {
                y: {
                    detach: ['one'],
                    attach: ['x_axis_imd_rank']
                }
            }
        },
    });
}).then(() => {
    return chart.animate({ // step4
        descriptor: {
            geometry: 'circle'
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
            }
        },
    });
    // }).then(() => {
    //     return chart.animate({ // step6
    //         descriptor: {
    //             channels: {
    //                 color: {
    //                     detach: ['levelling_up_categorisation'],
    //                     attach: ['region']
    //                 },
    //                 label: {
    //                     detach: ['local_authorities'],
    //                     attach: ['region']
    //                 },
    //             }
    //         },
    //     });
    // }).then(() => {
    //     return chart.animate({ // step7
    //         descriptor: {
    //             channels: {
    //                 color: {
    //                     detach: ['region'],
    //                     attach: ['supergroup_name']
    //                 }
    //             }
    //         },
    //     });
}).then(() => {
    return chart.animate({ // step7
        descriptor: {
            channels: {
                y: {
                    // detach: ['x_axis_imd_rank']
                },
                x: {
                    detach: ['y_axis_allcat_rank'],
                    attach: ['region', 'local_authorities']
                },
                color: {
                    detach: ['levelling_up_categorisation'],
                    attach: ['region']
                },
                label: {
                    detach: ['local_authorities']
                }
            },
            geometry: 'area',
        },
    });
}).then(() => {
    return chart.animate({ // step7
        descriptor: {
            channels: {
                y: {
                    detach: ['x_axis_imd_rank'],
                    attach: ['region', 'local_authorities'],
                },
                x: {
                    detach: ['region', 'local_authorities'],
                    attach: ['y_axis_allcat_rank'],
                },
            },
        },
    });
})