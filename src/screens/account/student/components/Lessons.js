import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import studentActions from '../student.actions';
import { MODAL_TYPES, MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../utils/consts';
import { ModalPreview, ModalEdit, ModalCreate, ModalDelete } from '../../../common/components/Modals';
import MyTable from '../../../common/components/MyTable';
import fireToast from '../../../common/components/Toaster';
import ModalAttendance from '../../../common/components/Modals/ModalAttendance';

const Lessons = (props) => {
    const {
        lessons,
        selectedLesson,
        modalState,
        getLessonsStatus,
        subscribeLessonStatus,
        unsubscribeLessonStatus,
        myData,
        myEnrolled,
        getAttendanceStatus,
        attendances,
        setAttendanceStatus,
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredLessons = lessons.filter(lesson => (
        lesson.name.includes(searchName) &&
        !myEnrolled.find((enrolledLesson) => enrolledLesson.id === lesson.id)
    ));

    // TODO hacer traducciones de error/success
    useEffect(() => {
        // console.log('lesson effect');
    }, [subscribeLessonStatus, unsubscribeLessonStatus]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.STUDENT_LESSON}
                data={selectedLesson}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onAttendances={() => props.changeModalState(MODAL_STATES.ATTENDANCE)}
                noEditOption
                noAttendanceOption={selectedLesson && myEnrolled.find((lesson) => selectedLesson.id === lesson.id) === undefined}
            />,
            <ModalAttendance
                key='modal-attendances'
                isOpen={modalState === MODAL_STATES.ATTENDANCE}    
                type={MODAL_TYPES.STUDENT_ATTENDANCES}
                getAttendancesStatus={getAttendanceStatus}
                attendances={attendances}
                setAttendanceStatus={setAttendanceStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onBack={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                onSetAttendance={(id, type, value) => props.inputChange(id, type, value)}
            />
        ])
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header>{I18n.t('admin.lessons.title')}</Header>
            </div>
            <div className='section-header-container'>
                <Input
                    id='table-search-input'
                    placeholder={I18n.t('admin.lessons.searchName')}
                    value={searchName}
                    type={FIELD_TYPES.STRING}
                    onChange={(e, data) => setSearchName(data.value)}
                />
            </div>
            <MyTable
                data={filteredLessons}
                noResults={filteredLessons.length === 0}
                columns={['name']}
                actions={[
                    { type: 'file alternate', action: (data) => {
                        props.selectLesson(data);
                        props.changeModalState(MODAL_STATES.PREVIEW);
                    }},
                    { type: 'signup', action: (data) => {
                        console.log('suscribed ', data, myData.id, data.id); 
                        props.subscribeLesson(myData.id, data.id);
                    }}
                ]}
                status={getLessonsStatus}
                color='yellow'
                noSortable
                loading={subscribeLessonStatus === REQUEST_STATUS.LOADING || unsubscribeLessonStatus === REQUEST_STATUS.LOADING}
            />
            <MyTable
                data={myEnrolled}
                noResults={myEnrolled.length === 0}
                columns={['name']}
                actions={[
                    { type: 'file alternate', action: (data) => {
                        props.selectLesson(data);
                        props.changeModalState(MODAL_STATES.PREVIEW);
                    }},
                    { type: 'remove', action: (data) => {
                        console.log('unsuscribed ', data, myData.id, data.id); 
                        props.unsubscribeLesson(myData.id, data.id);
                    }}
                ]}
                status={getLessonsStatus}
                color='yellow'
                noSortable
                loading={subscribeLessonStatus === REQUEST_STATUS.LOADING || unsubscribeLessonStatus === REQUEST_STATUS.LOADING}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    lessons: state.student.lessons,
    selectedLesson: state.student.selectedLesson,
    modalState: state.student.modalState,
    getLessonsStatus: state.student.getLessonsStatus,
    subscribeLessonStatus: state.student.subscribeLessonStatus,
    unsubscribeLessonStatus: state.student.unsubscribeLessonStatus,
    myData: state.student.myData,
    myEnrolled: state.student.myEnrolled,
    getAttendanceStatus: state.student.getAttendanceStatus,
    attendances: state.student.attendances,
    setAttendanceStatus: state.student.setAttendanceStatus,
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(studentActions.studentLessonsChangeModalState(modalState)),
    selectLesson: (lesson) => dispatch(studentActions.studentSelectLesson(lesson)),
    subscribeLesson: (lessonId, studentId) => dispatch(studentActions.subscribeLesson(lessonId, studentId)), 
    unsubscribeLesson: (lessonId, studentId) => dispatch(studentActions.unsubscribeLesson(lessonId, studentId)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);