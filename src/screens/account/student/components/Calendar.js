import React, { useEffect } from 'react';
import MyCalendar from '../../../common/components/MyCalendar';
import { Dimmer, Loader, Header } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { MODAL_TYPES, REQUEST_STATUS, MODAL_STATES } from '../../../../utils/consts';
import { ModalPreview } from '../../../common/components/Modals';
import fireToast from '../../../common/components/Toaster';
import studentActions from '../student.actions';
import { connect } from 'react-redux';

const Calendar = (props) => {
    const {
        modalState,
        calendar,
        getCalendarStatus,
        getLessonsStatus,
        lessons,
        selectedLesson
    } = props;

    // TODO calendar student firetoast texts
    useEffect(() => {
        if (getCalendarStatus === REQUEST_STATUS.ERROR) fireToast('getCalendar', '', 'error', 'warning');
        if (getLessonsStatus === REQUEST_STATUS.ERROR) fireToast('updateLesson', '', 'error', 'warning');
    }, [props.getCalendarStatus, props.updateLessonStatus]);

    const renderModals = () => {
        return (
            <ModalPreview
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.PREVIEW}    
                type={MODAL_TYPES.STUDENT_LESSON}
                data={selectedLesson}
                loading={getLessonsStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
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
    calendar: state.student.calendar,
    getCalendarStatus: state.student.getCalendarStatus,
    getLessonsStatus: state.student.getLessonsStatus,
    modalState: state.student.modalState,
    lessons: state.student.lessons,  // el calendar tiene solo el id de la leccion
    // y para seleccionar una lesson hay que dar toda la data jeje
    selectedLesson: state.student.selectedLesson
})

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(studentActions.adminLessonsChangeModalState(modalState))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);