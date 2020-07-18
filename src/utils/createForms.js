import { FIELD_TYPES } from "./consts";

export const createForms = {
    student: {
        name: FIELD_TYPES.STRING,
        surname: FIELD_TYPES.STRING,
        email: FIELD_TYPES.EMAIL,
        // password: FIELD_TYPES.BOOLEAN,
        dni: FIELD_TYPES.NUMBER,
        sex: FIELD_TYPES.BOOLEAN,
        birthday: FIELD_TYPES.BOOLEAN,
        address: FIELD_TYPES.BOOLEAN,
        // avatarUrl: FIELD_TYPES.BOOLEAN,
        socialPlan: FIELD_TYPES.BOOLEAN,
        affiliateNumber: FIELD_TYPES.BOOLEAN,
        inscriptionDate: FIELD_TYPES.BOOLEAN,
        fatherEmail: FIELD_TYPES.EMAIL,
        fatherName: FIELD_TYPES.STRING,
        fatherPhone: FIELD_TYPES.NUMBER,
        fatherSurname: FIELD_TYPES.STRING,
        // io:  FIELD_TYPES.STRING,
        motherEmail: FIELD_TYPES.EMAIL,
        motherName: FIELD_TYPES.STRING,
        motherPhone: FIELD_TYPES.BOOLEAN,
        motherSurname: FIELD_TYPES.BOOLEAN,
        phoneNumber: FIELD_TYPES.BOOLEAN,
        // role: FIELD_TYPES.STRING,
        verified: FIELD_TYPES.BOOLEAN
        // complete: FIELD_TYPES.BOOLEAN,
    },
    teacher: {
        // id: FIELD_TYPES.NUMBER,
        name: FIELD_TYPES.STRING,
        surname: FIELD_TYPES.STRING,
        email: FIELD_TYPES.STRING,
        cuil: FIELD_TYPES.NUMBER,
        dni: FIELD_TYPES.NUMBER,
        // password: FIELD_TYPES.STRING,
        phoneNumber: FIELD_TYPES.STRING,
        sex: FIELD_TYPES.STRING,
        // avatarUrl: FIELD_TYPES.STRING,
        // role: FIELD_TYPES.STRING,
    },
    lesson: {
        "endDate": 0,
        "name": "string",
        "startDate": 0,
        "teachers": [
          0
        ],
        "weekdays": [
          {
            "asWeekDay": "MONDAY",
            "day": "string",
            "duration": 0,
            "hour": 0,
            "id": 0,
            "minutes": 0
          }
        ]
    },
    payment: {
        "amount": 0,
        "date": "2020-07-11T01:27:44.883Z",
        "studentId": 0
    }
}