import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Header, Dimmer, Loader } from 'semantic-ui-react';
import MyCalendar from '../../../../common/components/MyCalendar';
import { I18n } from 'react-redux-i18n';
import adminLessonsActions from '../../lessons/admin.lessons.actions';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import { REQUEST_STATUS, MODAL_STATES, MODAL_TYPES } from '../../../../../utils/consts';
import fireToast from '../../../../common/components/Toaster';

const Calendar = (props) => {
    const {
        modalState,
        calendar,
        getCalendarStatus,
        updateLessonStatus,
        lessonForm,
        lessons
    } = props;

    useEffect(() => {
        if (getCalendarStatus === REQUEST_STATUS.ERROR) fireToast('getCalendar', '', 'error', 'warning');
        if (updateLessonStatus === REQUEST_STATUS.SUCCESS) fireToast('updateLesson', '', 'success', 'check');
        if (updateLessonStatus === REQUEST_STATUS.ERROR) fireToast('updateLesson', '', 'error', 'warning');
    }, [props.getCalendarStatus, props.updateLessonStatus])
    

    const renderModals = () => {
        return (
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}    
                type={MODAL_TYPES.ADMIN_LESSON}
                form={lessonForm}
                loading={updateLessonStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, value) => props.inputChange(id, value)}
                onCancel={() => {  // user cancel edition and goes back to preview mode
                    props.changeModalState(MODAL_STATES.CLOSED);
                }}
                onSubmit={() => props.updateLesson()}
                students={props.students}  // all students available
                teachers={props.teachers}  // all teachers available
            />
        );
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header>{I18n.t('admin.calendar.title')}</Header>
            </div>
            <Dimmer active={getCalendarStatus === REQUEST_STATUS.LOADING}><Loader/></Dimmer>
            <MyCalendar
                calendarEvents={calendar} 
                // TODO: cambiar a seleccionar el lesson y abrir el modal
                handleEventClick={(info) => {
                    props.selectLesson(lessons.find(lesson => lesson.id === info.event._def.extendedProps.lessonId));
                    props.changeModalState(MODAL_STATES.EDIT);
                }}
            />
        </div>
    );  
};

const mapStateToProps = (state) => ({
    calendar: state.admin.calendar.calendar,
    getCalendarStatus: state.admin.calendar.getCalendarStatus,
    
    // admin.lessons things
    modalState: state.admin.lessons.modalState,
    updateLessonStatus: state.admin.lessons.updateLessonStatus,
    lessonForm: state.admin.lessons.lessonForm,
    students: state.admin.students.students,
    teachers: state.admin.teachers.teachers,
    lessons: state.admin.lessons.lessons  // el calendar tiene solo el id de la leccion
    // y para seleccionar una lesson hay que dar toda la data jeje
})

const mapDispatchToProps = (dispatch) => ({
    // admin.lessons things
    changeModalState: (modalState) => dispatch(adminLessonsActions.adminLessonsChangeModalState(modalState)),
    inputChange: (id, value) => dispatch(adminLessonsActions.adminLessonsInputChange(id, value)),
    selectLesson: (lesson) => dispatch(adminLessonsActions.selectLesson(lesson)),
    updateLesson: (data) => dispatch(adminLessonsActions.updateLesson(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);