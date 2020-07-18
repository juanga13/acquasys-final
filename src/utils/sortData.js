import { MODAL_TYPES } from "./consts";

// we want custom sorting, order variable determines how
export const sortData = (modalType, data) => {
    let order = [];
    switch (modalType) {
        case MODAL_TYPES.ADMIN_STUDENT: 
            order = ['name', 'surname', 'email', 'password', 'dni', 'sex', 'birthday', 'phoneNumber', 'address', 'socialPlan', 'affiliateNumber', 'inscriptionDate', 'fatherName', 'fatherSurname', 'fatherEmail', 'fatherPhone', 'motherName', 'motherSurname', 'motherEmail', 'motherPhone', 'verified'];
            break;
        case MODAL_TYPES.ADMIN_TEACHER: 
            order = ['email', 'password', 'name', 'surname', 'dni', 'cuil', 'sex', 'phoneNumber'];
            break;
        case MODAL_TYPES.ADMIN_LESSON: 
            order = ['name', 'endDate', 'startDate', 'students', 'teachers', 'weekdays'];
            break;
        case MODAL_TYPES.ADMIN_PAYMENT:
            order = ['name', 'surname', 'dni', 'amount', 'date'];
            break;
        case MODAL_TYPES.STUDENT_LESSON: 
            order = [];
            break;
        case MODAL_TYPES.STUDENT_PAYMENT: 
            order = [];
            break;
        case MODAL_TYPES.TEACHER_LESSON: 
            order = [];
            break;
        default:
            order = [];  // !! not expected
            break;
    }
    const dataKeys = Object.keys(data);
    let result = {};
    order.forEach(item => {
        const keyFound = dataKeys.find(key => key === item);
        const valueFound = data[keyFound];
        result[keyFound] = valueFound;
    })
    return result;
};