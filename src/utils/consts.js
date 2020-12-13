export const FIELD_TYPES = {
    STRING: 'text',
    PASSWORD: 'password',
    EMAIL: 'email',
    NUMBER: 'number',
    DATE: 'date',
    BOOLEAN: 'boolean',
    TEXT_AREA: 'textArea',
    NULL: 'null'
};

export const FORMS = {
    LOGIN: 'login',
    REGISTER: 'register',
    NEW_STUDENT: 'newStudent',
    NEW_TEACHER: 'newTeacher',
    NEW_LESSON: 'newLesson',
    NEW_PAYMENT: 'newPayment'
};

export const REQUEST_STATUS = {
    NONE: { loading: false, success: false, error: false },
    LOADING: { loading: true, success: false, error: false },
    SUCCESS: { loading: false, success: true, error: false },
    ERROR: { loading: false, success: false, error: true },
};

export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    TEACHER: "ROLE_TEACHER",
    STUDENT: "ROLE_STUDENT",
    UNVERIFIED_STUDENT: "ROLE_UNREGISTERED",
};

export const MODAL_STATES = {
    CLOSED: 'CLOSED',
    PREVIEW: 'PREVIEW',
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    ATTENDANCE: 'ATTENDANCE',
    NEW_MESSAGE: 'NEW_MESSAGE' 
};

export const MODAL_TYPES = {
    ADMIN_PROFILE: 'adminProfile',
    ADMIN_STUDENT: 'adminStudent',
    ADMIN_TEACHER: 'adminTeacher',
    ADMIN_LESSON: 'adminLesson',
    ADMIN_ATTENDANCES: 'adminAttendances',
    ADMIN_PAYMENT: 'adminPayment',
    
    TEACHER_PROFILE: 'teacherProfile',
    TEACHER_STUDENT: 'teacherStudent',
    TEACHER_LESSON: 'teacherLesson',
    TEACHER_ATTENDANCES: 'teacherAttendances',
    
    STUDENT_PROFILE: 'studentProfile',
    STUDENT_STUDENT: 'studentStudent',
    STUDENT_LESSON: 'studentLesson',
    STUDENT_PAYMENT: 'studentPayment',
    STUDENT_ATTENDANCES: 'studentAttendances',

    UNVERIFIED_PROFILE: 'unverifiedProfile',
};

export const GENRES = {
    MASCULINE: 'Masculino',
    FEMENINE: 'Femenino'
};

// uppercase because back gives them like that
export const WEEKDAYS = {
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURDDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
    SUNDAY: 'SUNDAY'
}
export const allWeekDaysValues = Object.values(WEEKDAYS);