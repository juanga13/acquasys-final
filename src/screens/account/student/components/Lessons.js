import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import studentActions from '../student.actions';
import { MODAL_TYPES, MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../utils/consts';
import { ModalPreview, ModalEdit, ModalCreate, ModalDelete } from '../../../common/components/Modals';
import MyTable from '../../../common/components/MyTable';
import fireToast from '../../../common/components/Toaster';

const Lessons = (props) => {
    const {
        lessons,
        selectedLesson,
        modalState,
        getLessonsStatus,
        subscribeLessonStatus,
        unsubscribeLessonStatus
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredLessons = lessons.filter(lesson => lesson.name.includes(searchName));

    // TODO hacer traducciones de error/success
    useEffect(() => {
        console.log('lesson effect');
        if (subscribeLessonStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t(''), I18n.t(''),'success', 'check' );
        if (subscribeLessonStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t(''), I18n.t(''), 'error', 'warning' );
        if (unsubscribeLessonStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t(''), I18n.t(''), 'success', 'check' );
        if (unsubscribeLessonStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t(''), I18n.t(''), 'error', 'warning' );
    }, [props.subscribeLessonStatus, props.unsubscribeLessonStatus]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.ADMIN_LESSON}
                data={selectedLesson}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)} 
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
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
    lessons: state.student.lessons,
    selectedLesson: state.student.selectedLesson,
    modalState: state.student.modalState,
    getLessonsStatus: state.student.getLessonsStatus,
    subscribeLessonStatus: state.student.subscribeLessonStatus,
    unsubscribeLessonStatus: state.student.unsubscribeLessonStatus,
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(studentActions.adminLessonsChangeModalState(modalState)),
    selectLesson: (data) => dispatch(studentActions.selectLesson(data)),
    subscribeLesson: (lesson) => dispatch(studentActions.subscribeLesson(lesson)), 
    unsubscribeLesson: (lesson) => dispatch(studentActions.unsubscribeLesson(lesson)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);