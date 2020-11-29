import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import adminTeachersActions from '../admin.teachers.actions';
import { MODAL_TYPES, MODAL_STATES, REQUEST_STATUS, FIELD_TYPES } from '../../../../../utils/consts';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalDelete from '../../../../common/components/Modals/ModalDelete';
import MyTable from '../../../../common/components/MyTable';
import fireToast from '../../../../common/components/Toaster';

const Teachers = (props) => {
    const {
        teachers,
        selectedTeacher,
        modalState,
        getTeachersStatus,
        createTeacherStatus,
        updateTeacherStatus,
        deleteTeacherStatus,
        teacherForm
    } = props;
    const [searchName, setSearchName] = useState('');
    const filteredTeachers = teachers.filter(teacher => {
        const nameIncluded = teacher.name.toLowerCase().includes(searchName);
        const surnameIncluded = teacher.surname.toLowerCase().includes(searchName);
        const cuilIncluded = teacher.cuil.toString().includes(searchName);
        if (nameIncluded || surnameIncluded || cuilIncluded) return true;
        else return false;
    });
    useEffect(() => {
        // console.log('useEffect, teachers prop changed');
    }, [teachers, selectedTeacher]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.ADMIN_TEACHER}
                data={selectedTeacher}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)} 
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                showImage
            />,
            // ModalEdit with not null data is a new teacher
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}    
                type={MODAL_TYPES.ADMIN_TEACHER}
                form={teacherForm}
                loading={updateTeacherStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => {  // user cancel edition and goes back to preview mode
                    props.changeModalState(MODAL_STATES.PREVIEW);
                }}
                onSubmit={() => props.updateTeacher()}
                showImage
            />,
            <ModalCreate
                key='modal-create'
                isOpen={modalState === MODAL_STATES.CREATE}
                form={teacherForm}
                type={MODAL_TYPES.ADMIN_TEACHER}
                loading={createTeacherStatus === REQUEST_STATUS.LOADING}
                error={createTeacherStatus === REQUEST_STATUS.ERROR}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onSubmit={(data) => props.createTeacher(data)}  // triggers selectTeacher if success and opens preview
                showImage
            />,
            <ModalDelete
                key='modal-delete'
                isOpen={modalState === MODAL_STATES.DELETE}
                type={MODAL_TYPES.ADMIN_TEACHER}
                data={selectedTeacher}
                loading={deleteTeacherStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onSubmit={() => props.deleteTeacher(selectedTeacher.id)}
            />
        ])
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header>{I18n.t('admin.teachers.title')}</Header>
                <Button color='grey' onClick={() => props.changeModalState(MODAL_STATES.CREATE)}>
                    {I18n.t('admin.teachers.buttons.newTeacher')}
                </Button>
            </div>
            <div className='section-header-container'>
                <Input
                    id='table-search-input'
                    placeholder={I18n.t('admin.teachers.searchName')}
                    value={searchName}
                    type={FIELD_TYPES.STRING}
                    onChange={(e, data) => setSearchName(data.value)}
                />
            </div>
            <MyTable
                data={filteredTeachers}
                columns={['name', 'surname', 'cuil']}
                actions={[
                    { type: 'file alternate', action: (data) => {
                        props.selectTeacher(data);
                        props.changeModalState(MODAL_STATES.PREVIEW);
                    }},
                    { type: 'user delete', action: (data) => {
                        props.selectTeacher(data);
                        props.changeModalState(MODAL_STATES.DELETE);
                    }}
                ]}
                status={getTeachersStatus}
                color='pink'
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    teachers: state.admin.teachers.teachers,
    selectedTeacher: state.admin.teachers.selectedTeacher,
    modalState: state.admin.teachers.modalState,
    getTeachersStatus: state.admin.teachers.getTeachersStatus,
    createTeacherStatus: state.admin.teachers.createTeacherStatus,
    updateTeacherStatus: state.admin.teachers.updateTeacherStatus,
    deleteTeacherStatus: state.admin.teachers.deleteTeacherStatus,
    teacherForm: state.admin.teachers.teacherForm
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(adminTeachersActions.adminTeachersChangeModalState(modalState)),
    selectTeacher: (data) => dispatch(adminTeachersActions.selectTeacher(data)),
    createTeacher: (data) => dispatch(adminTeachersActions.createTeacher(data)),
    updateTeacher: (data) => dispatch(adminTeachersActions.updateTeacher(data)),
    deleteTeacher: (id) => dispatch(adminTeachersActions.deleteTeacher(id)),
    inputChange: (id, type, value) => dispatch(adminTeachersActions.adminTeachersInputChange(id, type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Teachers));