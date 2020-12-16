import React from 'react';
import './AttendanceCheckbox.scss'


export const CHECKED_STATE = {
    NONE: 'none',
    PRESENT: 'present',
    ABSENT: 'absent',
};
const AttendanceCheckbox = (props) => {
    const {
        key,
        checkedState,
        onChange,
        previewMode,
    } = props;


    const handleClick = (e) => {
        e.preventDefault();
        switch (checkedState) {
            case CHECKED_STATE.NONE: onChange(CHECKED_STATE.PRESENT); break;
            case CHECKED_STATE.PRESENT: onChange(CHECKED_STATE.ABSENT); break;
            case CHECKED_STATE.ABSENT: onChange(CHECKED_STATE.PRESENT); break;
            default: onChange(CHECKED_STATE.PRESENT);
        }
    }

    return (
        <div
            key={key}
            className={previewMode ? 'attendance-checkbox-container-preview'
                : 'attendance-checkbox-container'}
            onClick={handleClick}
        >
            {/* {checkedState === CHECKED_STATE.NONE && <p className='attendance-checkbox-letter'>P</p>} */}
            {checkedState === CHECKED_STATE.PRESENT && <p className='attendance-checkbox-letter'>✔</p>}
            {checkedState === CHECKED_STATE.ABSENT && <p className='attendance-checkbox-letter'>❌</p>}
        </div>
    )
}

export default AttendanceCheckbox
