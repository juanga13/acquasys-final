import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import teacherActions from '../teacher.actions';
import { MODAL_TYPES, MODAL_STATES, FIELD_TYPES, REQUEST_STATUS } from '../../../../utils/consts';
import { ModalPreview } from '../../../common/components/Modals';
import MyTable from '../../../common/components/MyTable/MyTable';
import ModalAttendance from '../../../common/components/Modals/ModalAttendance';


const Lessons = (props) => {
    const {
        lessons,
        selectedLesson,
        modalState,
        getLessonsStatus,
        attendances,
        getAttendancesStatus,
        setAttendanceStatus,
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredLessons = lessons.filter(lesson => lesson.name.includes(searchName));


    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.TEACHER_LESSON}
                data={selectedLesson}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)} 
                onAttendances={() => props.changeModalState(MODAL_STATES.ATTENDANCE)}
                noEditOption
            />,
            <ModalAttendance
                key='modal-attendances'
                isOpen={modalState === MODAL_STATES.ATTENDANCE}    
                type={MODAL_TYPES.STUDENT_ATTENDANCES}
                getAttendancesStatus={getAttendancesStatus}
                attendances={attendances}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onBack={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                setAttendanceStatus={setAttendanceStatus}
                onSetAttendance={(id, type, value) => props.inputChange(id, type, value)}
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
                loading={getAttendancesStatus === REQUEST_STATUS.LOADING}
                color='yellow'
                noResults={'a'}
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
    setAttendanceStatus: state.teacher.setAttendanceStatus,
    attendances: state.teacher.attendances
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(teacherActions.teacherChangeModalState(modalState)),
    selectLesson: (data) => dispatch(teacherActions.selectLesson(data)),
    setAttendance: (attendance) => dispatch(teacherActions.setAttendance(attendance))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);