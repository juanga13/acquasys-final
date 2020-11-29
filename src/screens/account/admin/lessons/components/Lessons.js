import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import adminLessonsActions from '../admin.lessons.actions';
import { MODAL_TYPES, MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../../utils/consts';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import ModalDelete from '../../../../common/components/Modals/ModalDelete';
import MyTable from '../../../../common/components/MyTable';
import fireToast from '../../../../common/components/Toaster';
import ModalAttendance from '../../../../common/components/Modals/ModalAttendance';

const Lessons = (props) => {
    const {
        lessons,
        selectedLesson,
        modalState,
        getLessonsStatus,
        createLessonStatus,
        updateLessonStatus,
        deleteLessonStatus,
        lessonForm,
        getAttendancesStatus,
        attendances,
        setAttendanceStatus
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredLessons = lessons.filter(lesson => lesson.name.toLowerCase().includes(searchName));

    useEffect(() => {
        console.log('lesson effect');
        if (getLessonsStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.lessons.error.get.title'), I18n.t('admin.lessons.error.get.description'), 'error', 'warning' );
        if (createLessonStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.lessons.success.create.title'), I18n.t('admin.lessons.success.create.description'),'success', 'check' );
        if (createLessonStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.lessons.error.create.title'), I18n.t('admin.lessons.error.create.description'), 'error', 'warning' );
        if (updateLessonStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.lessons.success.update.title'), I18n.t('admin.lessons.success.update.description'), 'success', 'check' );
        if (updateLessonStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.lessons.error.update.title'), I18n.t('admin.lessons.error.update.description'), 'error', 'warning' );
        if (deleteLessonStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.lessons.success.delete.title'), I18n.t('admin.lessons.success.delete.description'), 'success', 'check' );
        if (deleteLessonStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.lessons.error.delete.title'), I18n.t('admin.lessons.error.delete.description'), 'error', 'warning' );
    }, [props.createLessonStatus, props.updateLessonStatus, props.deleteLessonStatus]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.ADMIN_LESSON}
                data={selectedLesson}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)} 
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
            />,
            // ModalEdit with not null data is a new lesson
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}    
                type={MODAL_TYPES.ADMIN_LESSON}
                form={lessonForm}
                loading={updateLessonStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, value) => props.inputChange(id, value)}
                onCancel={() => {  // user cancel edition and goes back to preview mode
                    props.changeModalState(MODAL_STATES.PREVIEW);
                }}
                onSubmit={() => props.updateLesson()}
                students={props.students}  // all students available
                teachers={props.teachers}  // all teachers available
            />,
            <ModalAttendance
                key='modal-attendances'
                isOpen={modalState === MODAL_STATES.ATTENDANCE}    
                type={MODAL_TYPES.ADMIN_ASSISTANCES}
                getAttendancesStatus={getAttendancesStatus}
                attendances={attendances}
                setAttendanceStatus={setAttendanceStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onBack={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                onSetAttendance={(id, value) => props.inputChange(id, value)}
            />,
            <ModalCreate
                key='modal-create'
                isOpen={modalState === MODAL_STATES.CREATE}
                form={lessonForm}
                type={MODAL_TYPES.ADMIN_LESSON}
                loading={createLessonStatus === REQUEST_STATUS.LOADING}
                error={createLessonStatus === REQUEST_STATUS.ERROR}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, value) => props.inputChange(id, value)}
                onSubmit={(data) => props.createLesson(data)}  // triggers selectLesson if success and opens preview
                students={props.students}  // all students available
                teachers={props.teachers}  // all teachers available
            />,
            <ModalDelete
                key='modal-delete'
                isOpen={modalState === MODAL_STATES.DELETE}
                type={MODAL_TYPES.ADMIN_LESSON}
                data={selectedLesson}
                loading={deleteLessonStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onSubmit={() => props.deleteLesson(selectedLesson.id)}
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
    lessons: state.admin.lessons.lessons,
    selectedLesson: state.admin.lessons.selectedLesson,
    modalState: state.admin.lessons.modalState,
    getLessonsStatus: state.admin.lessons.getLessonsStatus,
    createLessonStatus: state.admin.lessons.createLessonStatus,
    updateLessonStatus: state.admin.lessons.updateLessonStatus,
    deleteLessonStatus: state.admin.lessons.deleteLessonStatus,
    lessonForm: state.admin.lessons.lessonForm,
    students: state.admin.students.students,
    teachers: state.admin.teachers.teachers,
    getAttendancesStatus: state.admin.lessons.getAttendancesStatus,
    attendances: state.admin.lessons.attendances,
    setAttendanceStatus: state.admin.lessons.setAttendanceStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(adminLessonsActions.adminLessonsChangeModalState(modalState)),
    selectLesson: (data) => dispatch(adminLessonsActions.selectLesson(data)),
    createLesson: (data) => dispatch(adminLessonsActions.createLesson(data)),
    updateLesson: (data) => dispatch(adminLessonsActions.updateLesson(data)),
    deleteLesson: (id) => dispatch(adminLessonsActions.deleteLesson(id)),
    inputChange: (id, value) => dispatch(adminLessonsActions.adminLessonsInputChange(id, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lessons));