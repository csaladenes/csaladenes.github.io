import Vizzu from 'https://vizzuhq.github.io/vizzu-beta-release/0.2.0/vizzu.js';
import {
    data
}
from '../data.js';

const chart = new Vizzu('vizzuCanvas');
let slider = document.getElementById("myRange");

slider.oninput = (e) => {
    let t = e.target.value;
    chart.animation.pause();
    chart.animation.seek(t / 1 + '%');

};

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
        style: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 15,
            fontFamily: 'Coda',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            plot: {
                axis: {
                    label: {
                        color: '' //only y axis?
                    }
                }
            }
        }
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
        }
    });
}).then(() => {
    return chart.animate({ // step3
        descriptor: {
            channels: {
                y: {
                    detach: ['one'],
                    attach: ['x_axis_imd_rank'],
                    title: 'Rank by deprivation' //really kudos for y-label on top!
                }
            },
            title: 'And ranked by deprivation'
        },
        style: {
            plot: {
                axis: {
                    label: {
                        color: '#888888' //default? //no gray/yellow //no #777
                    }
                }
            }
        }
    });
}).then(() => {
    return chart.animate({ // step4
        descriptor: {
            geometry: 'circle',
            title: "It's a good match",
            // size: 50
        },
        style: {
            plot: {
                marker: {
                    guides: {
                        color: '',
                        lineWidth: 0
                    }
                }
            }
        }
    });
}).then(() => {
    return chart.animate({ // step5
        descriptor: {
            channels: {
                label: {
                    attach: ['local_authorities'] //check if deactivated
                },
                x: {
                    detach: ['levelling_up_categorisation',
                        'local_authorities'
                    ],
                    attach: ['y_axis_allcat_rank'],
                    title: 'Rank by COVID economic impact'
                }
            },
            title: "But if ranked on COVID economic impact..."
            //title and y_title moves!
        },
        style: {
            plot: {
                marker: {
                    label: {
                        fontSize: 0,
                        color: '',
                        // position: 'below' | 'center' | 'above' //left right
                        // filter only on labels
                    }
                }
            }
        }
    })
}).then(() => {
    return chart.animate({ // step6
        data: {
            filter: (d) => {
                return d['label_2_highest_lowest'] == 'lab'; //filter only on label, not dataset?
            }
        },
        descriptor: {
            channels: {
                label: {
                    attach: ['local_authorities'] //check if deactivated
                },
                x: {
                    detach: ['levelling_up_categorisation',
                        'local_authorities'
                    ],
                    attach: ['y_axis_allcat_rank'],
                    title: 'Rank by COVID economic impact'
                }
            },
            title: "These are the hardest/lightest local authorities"
        },
        style: {
            plot: {
                marker: {
                    label: {
                        fontSize: 11,
                        // position: 'below' | 'center' | 'above' //left right //dx, dy //textAlign: 'center, left, right',
                    }
                }
            }
        }
    })
}).then(() => {
    return chart.animate({ // step7
        data: {
            filter: (d) => {
                return d['region'] == 'London'; //filter only on label, not dataset?
            }
        },
        descriptor: {
            title: "London took the hardest hit" //opacity based on condition?
        },
        style: {
            plot: {
                marker: {
                    label: {
                        // opacity: 0.9, 
                        // lightness: 0.9
                        // grayscale: 0.5
                        color: '#ff7711', //no effect
                        fontSize: 15,
                        filter: 'color(#0000FF)' //makes everything blue
                    }
                }
            }
        }
    })
}).then(() => {
    return chart.animate({ // step8 //gets Javascrpt error on setInterval
        // data: {
        //     filter: (d) => {
        //         return d; //reset filter?
        //     }
        // },
        // data: data,
        descriptor: {
            // channels: {
            //     y: {
            //         detach: ['x_axis_imd_rank'],
            //         attach: ['region', 'local_authorities']
            //     },
            //     x: {
            //         detach: ['y_axis_allcat_rank'],
            //     },
            //     color: {
            //         detach: ['levelling_up_categorisation'],
            //         attach: ['region']
            //     },
            //     label: {
            //         // detach: ['local_authorities']
            //     }
            // },
            // geometry: 'rectangle',
            // title: "Some areas are clear outliers"
        },
    });
})