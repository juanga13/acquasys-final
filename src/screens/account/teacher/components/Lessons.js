import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import teacherActions from '../teacher.actions';
import { MODAL_TYPES, MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../utils/consts';
import { ModalPreview } from '../../../common/components/Modals';
import MyTable from '../../../common/components/MyTable';
import fireToast from '../../../common/components/Toaster';

const Lessons = (props) => {
    const {
        lessons,
        selectedLesson,
        modalState,
        getLessonsStatus,
        getAttendancesStatus,
        attendances,
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredLessons = lessons.filter(lesson => lesson.name.includes(searchName));

    useEffect(() => {
        if (getLessonsStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('teacher.lessons.error.get.title'), I18n.t('teacher.lessons.error.get.description'), 'error', 'warning' );
        if (getAttendancesStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('teacher.lessons.success.setAttendance.title'), I18n.t('teacher.lessons.success.setAttendance.description'), 'success', 'check' );
        if (getAttendancesStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('teacher.lessons.error.setAttendance.title'), I18n.t('teacher.lessons.error.setAttendance.description'), 'error', 'warning' );
    }, [props.getLessonsStatus, props.getAttendancesStatus]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.TEACHER_LESSON}
                data={selectedLesson}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)} 
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                attendances={attendances}
            />
        ])
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header>{I18n.t('admin.lessons.title')}</Header>
                <Button color='grey' onClick={() => props.changeModalState(MODAL_STATES.CREATE)}>
                    {I18n.t('admin.lessons.buttons.newLesson')}
                </Button>
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
                noResults={searchName.length > 0 && filteredLessons.length === 0}
                columns={['name']}
                actions={[
                    { type: 'file alternate', action: (data) => {
                        props.selectLesson(data);
                        props.changeModalState(MODAL_STATES.PREVIEW);
                    }},
                    { type: 'user delete', action: (data) => {
                        props.selectLesson(data);
                        props.changeModalState(MODAL_STATES.DELETE);
                    }}
                ]}
                status={getLessonsStatus}
                color='yellow'
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    lessons: state.teacher.lessons,
    selectedLesson: state.teacher.selectedLesson,
    modalState: state.teacher.modalState,
    getLessonsStatus: state.teacher.getLessonsStatus,
    getAttendancesStatus: state.teacher.getAttendancesStatus,
    attendances: state.teacher.attendances
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(teacherActions.teacherChangeModalState(modalState)),
    selectLesson: (data) => dispatch(teacherActions.selectLesson(data)),
    setAttendance: (attendance) => dispatch(teacherActions.setAttendance(attendance))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);