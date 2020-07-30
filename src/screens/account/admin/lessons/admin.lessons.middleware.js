import adminLessonsActions, { 
    ADMIN_GET_LESSONS, 
    CREATE_LESSON, 
    ADMIN_LESSONS_CHANGE_MODAL_STATE, 
    DELETE_LESSON,
    UPDATE_LESSON
} from './admin.lessons.actions';
import requests from './admin.lessons.services';
import { MODAL_STATES } from '../../../../utils/consts';
import { formToDataTransform } from '../../../../utils/dataFormTransform';

const adminLessonsMiddleware = ({ dispatch, getState }) => next => action => {
    next(action);
    switch (action.type) {
        case ADMIN_GET_LESSONS:
            requests.getLessons()
                .then(response => dispatch(adminLessonsActions.getLessonsSuccess(response)))
                .catch(() => dispatch(adminLessonsActions.getLessonsError()));
            break;

        case ADMIN_LESSONS_CHANGE_MODAL_STATE:
            action.modalState === MODAL_STATES.CLOSED && dispatch(adminLessonsActions.selectLesson(null))
            break;

        case CREATE_LESSON:
            const createLessonForm = getState().admin.lessons.lessonForm;
            let createData = formToDataTransform(createLessonForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!
            createData.avatarUrl = '';
            createData.id = 0;
            if (createData.password.value === '') {
                createData.password.value = 'asd123';
            }
            requests.createLesson(createData)
                .then(() => {
                    dispatch(adminLessonsActions.createLessonSuccess());
                    dispatch(adminLessonsActions.getLessons())
                })
                .catch(() => dispatch(adminLessonsActions.createLessonError()));
            break;

        case UPDATE_LESSON:
            const updateSelectedLesson = getState().admin.lessons.selectedLesson;
            let updateData = formToDataTransform(getState().admin.lessons.lessonForm);
            // take missing data (not shown in form) and add it in order to make the request
            // take data from getState().selectedLesson and insert it into data!
            updateData.avatarUrl = updateSelectedLesson.avatarUrl || null;
            updateData.id = updateSelectedLesson.id;
            updateData.role = updateSelectedLesson.role;
            if (updateData.password === '') {
                updateData.password = updateSelectedLesson.password;
            }
            requests.updateLesson(updateData)
                .then(() => {
                    dispatch(adminLessonsActions.updateLessonSuccess());
                    dispatch(adminLessonsActions.getLessons())
                })
                .catch(() => dispatch(adminLessonsActions.updateLessonError()));
            break;

        case DELETE_LESSON:
            requests.deleteLesson(action.id)
                .then(() => {
                    dispatch(adminLessonsActions.deleteLessonSuccess());
                    dispatch(adminLessonsActions.selectLesson(null));
                    dispatch(adminLessonsActions.getLessons());
                })
                .catch(() => dispatch(adminLessonsActions.deleteLessonError()));
            break;

        default: break;
    }
};

export default adminLessonsMiddleware;