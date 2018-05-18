const textBlack = 'rgba(0, 0, 0, .87)';
const textWhite = '#fff';
const colors: any[] = [{
    name: 'red'
}, {
    name: 'pink'
}, {
    name: 'purple'
}, {
    name: 'deepPurple'
}, {
    name: 'indigo'
}, {
    name: 'blue'
}, {
    name: 'lightBlue'
}, {
    name: 'cyan'
}, {
    name: 'teal'
}, {
    name: 'green'
}, {
    name: 'lightGreen'
}, {
    name: 'lime'
}, {
    name: 'yellow'
}, {
    name: 'amber'
}, {
    name: 'orange'
}, {
    name: 'deepOrange'
}, {
    name: 'brown'
}, {
    name: 'grey'
}, {
    name: 'blueGrey'
}, {
    name: 'black',
    hideSlider: true
}, {
    name: 'white',
    hideSlider: true,
    hasBorder: true
}];
const palette: any = {
    red: {
        50: {
            color: '#ffebee',
            text: textBlack
        },
        100: {
            color: '#ffcdd2',
            text: textBlack
        },
        200: {
            color: '#ef9a9a',
            text: textBlack
        },
        300: {
            color: '#e57373',
            text: textBlack
        },
        400: {
            color: '#ef5350',
            text: textWhite
        },
        500: {
            color: '#f44336',
            text: textWhite
        },
        600: {
            color: '#e53935',
            text: textWhite
        },
        700: {
            color: '#d32f2f',
            text: textWhite
        },
        800: {
            color: '#c62828',
            text: textWhite
        },
        900: {
            color: '#b71c1c',
            text: textWhite
        }
    },
    pink: {
        50: {
            color: '#fce4ec',
            text: textBlack
        },
        100: {
            color: '#f8bbd0',
            text: textBlack
        },
        200: {
            color: '#f48fb1',
            text: textBlack
        },
        300: {
            color: '#f06292',
            text: textWhite
        },
        400: {
            color: '#ec407a',
            text: textWhite
        },
        500: {
            color: '#e91e63',
            text: textWhite
        },
        600: {
            color: '#d81b60',
            text: textWhite
        },
        700: {
            color: '#c2185b',
            text: textWhite
        },
        800: {
            color: '#ad1457',
            text: textWhite
        },
        900: {
            color: '#880e4f',
            text: textWhite
        }
    },
    purple: {
        50: {
            color: '#f3e5f5',
            text: textBlack
        },
        100: {
            color: '#e1bee7',
            text: textBlack
        },
        200: {
            color: '#ce93d8',
            text: textBlack
        },
        300: {
            color: '#ba68c8',
            text: textWhite
        },
        400: {
            color: '#ab47bc',
            text: textWhite
        },
        500: {
            color: '#9c27b0',
            text: textWhite
        },
        600: {
            color: '#8e24aa',
            text: textWhite
        },
        700: {
            color: '#7b1fa2',
            text: textWhite
        },
        800: {
            color: '#6a1b9a',
            text: textWhite
        },
        900: {
            color: '#4a148c',
            text: textWhite
        }
    },
    deepPurple: {
        50: {
            color: '#ede7f6',
            text: textBlack
        },
        100: {
            color: '#d1c4e9',
            text: textBlack
        },
        200: {
            color: '#b39ddb',
            text: textBlack
        },
        300: {
            color: '#9575cd',
            text: textWhite
        },
        400: {
            color: '#7e57c2',
            text: textWhite
        },
        500: {
            color: '#673ab7',
            text: textWhite
        },
        600: {
            color: '#5e35b1',
            text: textWhite
        },
        700: {
            color: '#512da8',
            text: textWhite
        },
        800: {
            color: '#4527a0',
            text: textWhite
        },
        900: {
            color: '#311b92',
            text: textWhite
        }
    },
    indigo: {
        50: {
            color: '#e8eaf6',
            text: textBlack
        },
        100: {
            color: '#c5cae9',
            text: textBlack
        },
        200: {
            color: '#9fa8da',
            text: textBlack
        },
        300: {
            color: '#7986cb',
            text: textWhite
        },
        400: {
            color: '#5c6bc0',
            text: textWhite
        },
        500: {
            color: '#3f51b5',
            text: textWhite
        },
        600: {
            color: '#3949ab',
            text: textWhite
        },
        700: {
            color: '#303f9f',
            text: textWhite
        },
        800: {
            color: '#283593',
            text: textWhite
        },
        900: {
            color: '#1a237e',
            text: textWhite
        }
    },
    blue: {
        50: {
            color: '#e3f2fd',
            text: textBlack
        },
        100: {
            color: '#bbdefb',
            text: textBlack
        },
        200: {
            color: '#90caf9',
            text: textBlack
        },
        300: {
            color: '#64b5f6',
            text: textBlack
        },
        400: {
            color: '#42a5f5',
            text: textBlack
        },
        500: {
            color: '#2196f3',
            text: textWhite
        },
        600: {
            color: '#1e88e5',
            text: textWhite
        },
        700: {
            color: '#1976d2',
            text: textWhite
        },
        800: {
            color: '#1565c0',
            text: textWhite
        },
        900: {
            color: '#0d47a1',
            text: textWhite
        }
    },
    lightBlue: {
        50: {
            color: '#e1f5fe',
            text: textBlack
        },
        100: {
            color: '#b3e5fc',
            text: textBlack
        },
        200: {
            color: '#81d4fa',
            text: textBlack
        },
        300: {
            color: '#4fc3f7',
            text: textBlack
        },
        400: {
            color: '#29b6f6',
            text: textBlack
        },
        500: {
            color: '#03a9f4',
            text: textBlack
        },
        600: {
            color: '#039be5',
            text: textWhite
        },
        700: {
            color: '#0288d1',
            text: textWhite
        },
        800: {
            color: '#0277bd',
            text: textWhite
        },
        900: {
            color: '#01579b',
            text: textWhite
        }
    },
    cyan: {
        50: {
            color: '#e0f7fa',
            text: textBlack
        },
        100: {
            color: '#b2ebf2',
            text: textBlack
        },
        200: {
            color: '#80deea',
            text: textBlack
        },
        300: {
            color: '#4dd0e1',
            text: textBlack
        },
        400: {
            color: '#26c6da',
            text: textBlack
        },
        500: {
            color: '#00bcd4',
            text: textBlack
        },
        600: {
            color: '#00acc1',
            text: textBlack
        },
        700: {
            color: '#0097a7',
            text: textWhite
        },
        800: {
            color: '#00838f',
            text: textWhite
        },
        900: {
            color: '#006064',
            text: textWhite
        }
    },
    teal: {
        50: {
            color: '#e0f2f1',
            text: textBlack
        },
        100: {
            color: '#b2dfdb',
            text: textBlack
        },
        200: {
            color: '#80cbc4',
            text: textBlack
        },
        300: {
            color: '#4db6ac',
            text: textBlack
        },
        400: {
            color: '#26a69a',
            text: textBlack
        },
        500: {
            color: '#009688',
            text: textWhite
        },
        600: {
            color: '#00897b',
            text: textWhite
        },
        700: {
            color: '#00796b',
            text: textWhite
        },
        800: {
            color: '#00695c',
            text: textWhite
        },
        900: {
            color: '#004d40',
            text: textWhite
        }
    },
    green: {
        50: {
            color: '#e8f5e9',
            text: textBlack
        },
        100: {
            color: '#c8e6c9',
            text: textBlack
        },
        200: {
            color: '#a5d6a7',
            text: textBlack
        },
        300: {
            color: '#81c784',
            text: textBlack
        },
        400: {
            color: '#66bb6a',
            text: textBlack
        },
        500: {
            color: '#4caf50',
            text: textBlack
        },
        600: {
            color: '#43a047',
            text: textWhite
        },
        700: {
            color: '#388e3c',
            text: textWhite
        },
        800: {
            color: '#2e7d32',
            text: textWhite
        },
        900: {
            color: '#1b5e20',
            text: textWhite
        }
    },
    lightGreen: {
        50: {
            color: '#f1f8e9',
            text: textBlack
        },
        100: {
            color: '#dcedc8',
            text: textBlack
        },
        200: {
            color: '#c5e1a5',
            text: textBlack
        },
        300: {
            color: '#aed581',
            text: textBlack
        },
        400: {
            color: '#9ccc65',
            text: textBlack
        },
        500: {
            color: '#8bc34a',
            text: textBlack
        },
        600: {
            color: '#7cb342',
            text: textBlack
        },
        700: {
            color: '#689f38',
            text: textWhite
        },
        800: {
            color: '#558b2f',
            text: textWhite
        },
        900: {
            color: '#33691e',
            text: textWhite
        }
    },
    lime: {
        50: {
            color: '#f9fbe7',
            text: textBlack
        },
        100: {
            color: '#f0f4c3',
            text: textBlack
        },
        200: {
            color: '#e6ee9c',
            text: textBlack
        },
        300: {
            color: '#dce775',
            text: textBlack
        },
        400: {
            color: '#d4e157',
            text: textBlack
        },
        500: {
            color: '#cddc39',
            text: textBlack
        },
        600: {
            color: '#c0ca33',
            text: textBlack
        },
        700: {
            color: '#afb42b',
            text: textBlack
        },
        800: {
            color: '#9e9d24',
            text: textBlack
        },
        900: {
            color: '#827717',
            text: textWhite
        }
    },
    yellow: {
        50: {
            color: '#fffde7',
            text: textBlack
        },
        100: {
            color: '#fff9c4',
            text: textBlack
        },
        200: {
            color: '#fff59d',
            text: textBlack
        },
        300: {
            color: '#fff176',
            text: textBlack
        },
        400: {
            color: '#ffee58',
            text: textBlack
        },
        500: {
            color: '#ffeb3b',
            text: textBlack
        },
        600: {
            color: '#fdd835',
            text: textBlack
        },
        700: {
            color: '#fbc02d',
            text: textBlack
        },
        800: {
            color: '#f9a825',
            text: textBlack
        },
        900: {
            color: '#f57f17',
            text: textBlack
        }
    },
    amber: {
        50: {
            color: '#fff8e1',
            text: textBlack
        },
        100: {
            color: '#ffecb3',
            text: textBlack
        },
        200: {
            color: '#ffe082',
            text: textBlack
        },
        300: {
            color: '#ffd54f',
            text: textBlack
        },
        400: {
            color: '#ffca28',
            text: textBlack
        },
        500: {
            color: '#ffc107',
            text: textBlack
        },
        600: {
            color: '#ffb300',
            text: textBlack
        },
        700: {
            color: '#ffa000',
            text: textBlack
        },
        800: {
            color: '#ff8f00',
            text: textBlack
        },
        900: {
            color: '#ff6f00',
            text: textBlack
        }
    },
    orange: {
        50: {
            color: '#fff3e0',
            text: textBlack
        },
        100: {
            color: '#ffe0b2',
            text: textBlack
        },
        200: {
            color: '#ffcc80',
            text: textBlack
        },
        300: {
            color: '#ffb74d',
            text: textBlack
        },
        400: {
            color: '#ffa726',
            text: textBlack
        },
        500: {
            color: '#ff9800',
            text: textBlack
        },
        600: {
            color: '#fb8c00',
            text: textBlack
        },
        700: {
            color: '#f57c00',
            text: textBlack
        },
        800: {
            color: '#ef6c00',
            text: textWhite
        },
        900: {
            color: '#e65100',
            text: textWhite
        }
    },
    deepOrange: {
        50: {
            color: '#fbe9e7',
            text: textBlack
        },
        100: {
            color: '#ffccbc',
            text: textBlack
        },
        200: {
            color: '#ffab91',
            text: textBlack
        },
        300: {
            color: '#ff8a65',
            text: textBlack
        },
        400: {
            color: '#ff7043',
            text: textBlack
        },
        500: {
            color: '#ff5722',
            text: textWhite
        },
        600: {
            color: '#f4511e',
            text: textWhite
        },
        700: {
            color: '#e64a19',
            text: textWhite
        },
        800: {
            color: '#d84315',
            text: textWhite
        },
        900: {
            color: '#bf360c',
            text: textWhite
        }
    },
    brown: {
        50: {
            color: '#efebe9',
            text: textBlack
        },
        100: {
            color: '#d7ccc8',
            text: textBlack
        },
        200: {
            color: '#bcaaa4',
            text: textBlack
        },
        300: {
            color: '#a1887f',
            text: textWhite
        },
        400: {
            color: '#8d6e63',
            text: textWhite
        },
        500: {
            color: '#795548',
            text: textWhite
        },
        600: {
            color: '#6d4c41',
            text: textWhite
        },
        700: {
            color: '#5d4037',
            text: textWhite
        },
        800: {
            color: '#4e342e',
            text: textWhite
        },
        900: {
            color: '#3e2723',
            text: textWhite
        }
    },
    grey: {
        50: {
            color: '#fafafa',
            text: textBlack
        },
        100: {
            color: '#f5f5f5',
            text: textBlack
        },
        200: {
            color: '#eeeeee',
            text: textBlack
        },
        300: {
            color: '#e0e0e0',
            text: textBlack
        },
        400: {
            color: '#bdbdbd',
            text: textBlack
        },
        500: {
            color: '#9e9e9e',
            text: textBlack
        },
        600: {
            color: '#757575',
            text: textWhite
        },
        700: {
            color: '#616161',
            text: textWhite
        },
        800: {
            color: '#424242',
            text: textWhite
        },
        900: {
            color: '#212121',
            text: textWhite
        }
    },
    blueGrey: {
        50: {
            color: '#eceff1',
            text: textBlack
        },
        100: {
            color: '#cfd8dc',
            text: textBlack
        },
        200: {
            color: '#b0bec5',
            text: textBlack
        },
        300: {
            color: '#90a4ae',
            text: textBlack
        },
        400: {
            color: '#78909c',
            text: textWhite
        },
        500: {
            color: '#607d8b',
            text: textWhite
        },
        600: {
            color: '#546e7a',
            text: textWhite
        },
        700: {
            color: '#455a64',
            text: textWhite
        },
        800: {
            color: '#37474f',
            text: textWhite
        },
        900: {
            color: '#263238',
            text: textWhite
        }
    },
    black: {
        500: {
            color: '#000000',
            text: textWhite
        }
    },
    white: {
        500: {
            color: '#FFFFFF',
            text: textBlack
        }
    }
};
export {
    palette,
    colors
}
