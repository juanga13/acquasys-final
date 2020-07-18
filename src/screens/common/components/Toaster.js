import React from 'react';
const { toast } = require("react-semantic-toasts");

/**
 * 
 * 
 * @param { string } title 
 * @param { string } description 
 * @param { string } type 'info' | 'success' | 'warning' | 'error'
 * @param { semantic icon } icon
 * @param { semantic animation } animation 
 * @param { number } time 
 * @param { function } onClose
 * @param { function } onClick
 * @param { function } onDismiss
 */
const fireToast = (
    title,
    description,
    type,  
    icon,
    // animation = 'swing left',
    time = 3000,
//     onClose = null,
//     onClick = null,
//     onDismiss = null
) => {
    console.log('firing toast');
    setTimeout(() => {
        toast({
            type: type,
            icon: icon,
            title: title,
            description: description,
            // animation: animation,
            time: time,
            // onClose: () => onClose(),
            // // onClick: () => onClick(),
            // onDismiss: () => onDismiss()
        });
    }, 0);
};

export default fireToast;