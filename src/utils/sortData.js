import { MODAL_TYPES } from "./consts";

/*
    ordena data para imprimir en los previews, porque a diferencia 
    de los forms data nos lo dan en orden alfabetico de key, aca 
    de paso tenemos un poco mas claro en que orden quiero que se
    muestren los datos.
*/
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
            order = ['name', 'startDate', 'endDate', 'students', 'teachers', 'weekdays'];
            break;
        case MODAL_TYPES.ADMIN_PAYMENT:
            order = ['name', 'surname', 'dni', 'amount', 'date'];
            break;
        case MODAL_TYPES.STUDENT_LESSON: 
            order = ['name', 'startDate', 'endDate', 'students', 'teachers', 'weekdays'];
            break;
        case MODAL_TYPES.STUDENT_PAYMENT: 
            order = [];
            break;
        case MODAL_TYPES.TEACHER_LESSON: 
            order = ['name', 'endDate', 'startDate', 'students', 'teachers', 'weekdays'];
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