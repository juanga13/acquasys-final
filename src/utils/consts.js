export const FIELD_TYPES = {
    STRING: 'text',
    PASSWORD: 'password',
    EMAIL: 'email',
    NUMBER: 'number',
    DATE: 'date',
    BOOLEAN: 'boolean',
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
    DELETE: 'DELETE'
};

export const MODAL_TYPES = {
    ADMIN_STUDENT: 'adminStudent',
    ADMIN_TEACHER: 'adminTeacher',
    ADMIN_LESSON: 'adminLesson',
    ADMIN_PAYMENT: 'adminPayment',
    STUDENT_LESSON: 'studentLesson',
    STUDENT_PAYMENT: 'studentPayment',
    TEACHER_LESSON: 'teacherLesson',
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
    THURDSAY: 'THURDSAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY',
    SUNDAY: 'SUNDAY'
}
export const allWeekDaysValues = Object.values(WEEKDAYS);