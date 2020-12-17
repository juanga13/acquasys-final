/**
 * Simple utilty for icon colorization
 */
 
const getColor = icon => {
    switch (icon) {
        case 'edit':  // edit icon
            return 'blue';
        case 'remove':
        case 'user delete':  // delete icon
            return 'red';
        case 'file alternate':  // preview icon
            return 'grey'
        case 'signup':
            return 'yellow';
        case 'dollar sign':
            return 'green';
            
        default:
            return 'black'
    }
}

export { getColor }