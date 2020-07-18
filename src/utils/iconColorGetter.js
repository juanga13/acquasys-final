/**
 * Simple utilty for icon colorization
 */
 
const getColor = icon => {
    switch (icon) {
        case 'edit':  // edit icon
            return 'blue';
        case 'user delete':  // delete icon
            return 'red';
        case 'file alternate':  // preview icon
            return 'grey'
        
        default:
            return 'black'
    }
}

export { getColor }