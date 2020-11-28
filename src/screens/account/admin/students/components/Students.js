import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import MyTable from '../../../../common/components/MyTable';
import { REQUEST_STATUS, MODAL_STATES, MODAL_TYPES } from '../../../../../utils/consts';
import adminStudentsActions from '../admin.students.actions';
import ModalDelete from '../../../../common/components/Modals/ModalDelete';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import fireToast from '../../../../common/components/Toaster';

const Students = (props) => {
    const {
        students,
        selectedStudent,
        modalState,
        studentForm,
        getStudentsStatus,
        createStudentStatus,
        updateStudentStatus,
        deleteStudentStatus
    } = props;

    useEffect(() => {
        console.log('create student effect');
        if (createStudentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.students.success.create.title'), I18n.t('admin.students.success.create.description'),'success', 'check' );
        if (createStudentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.students.error.create.title'), I18n.t('admin.students.error.create.description'), 'error', 'warning' );
    }, [props.createStudentStatus]);

    useEffect(() => {
        console.log('update student effect');
        if (updateStudentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.students.success.update.title'), I18n.t('admin.students.success.update.description'), 'success', 'check' );
        if (updateStudentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.students.error.update.title'), I18n.t('admin.students.error.update.description'), 'error', 'warning' );
    }, [props.updateStudentStatus]);

    useEffect(() => {
        console.log('delete student effect');
        if (deleteStudentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.students.success.delete.title'), I18n.t('admin.students.success.delete.description'), 'success', 'check' );
        if (deleteStudentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.students.error.delete.title'), I18n.t('admin.students.error.delete.description'), 'error', 'warning' );
    }, [props.deleteStudentStatus]);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW}
                type={MODAL_TYPES.ADMIN_STUDENT}
                data={selectedStudent}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                showImage
            />,
            // ModalEdit with not null data is a new student
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}
                type={MODAL_TYPES.ADMIN_STUDENT}
                form={studentForm}
                status={createStudentStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onVerify={(id) => props.verifyStudent(id)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => {  // user cancel edition and goes back to preview mode
                    props.changeModalState(MODAL_STATES.PREVIEW);
                }}
                onSubmit={() => props.updateStudent()}
                showImage
            />,
            <ModalCreate
                key='modal-create'
                isOpen={modalState === MODAL_STATES.CREATE}
                form={studentForm}
                type={MODAL_TYPES.ADMIN_STUDENT}
                status={createStudentStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onSubmit={(data) => props.createStudent(data)}  // triggers selectStudent if success and opens preview
                showImage
            />,
            <ModalDelete
                key='modal-delete'
                isOpen={modalState === MODAL_STATES.DELETE}
                type={MODAL_TYPES.ADMIN_STUDENT}
                data={selectedStudent}
                status={createStudentStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onSubmit={() => props.deleteStudent(selectedStudent.id)}
            />
        ])
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header>{I18n.t('admin.students.title')}</Header>
                <Button color='grey' onClick={() => props.changeModalState(MODAL_STATES.CREATE)}>
                    {I18n.t('admin.students.buttons.newStudent')}
                </Button>
            </div>
            <MyTable
                data={students}
                columns={['name', 'surname', 'dni']}
                actions={[
                    {
                        type: 'file alternate', action: (data) => {
                            props.selectStudent(data);
                            props.changeModalState(MODAL_STATES.PREVIEW);
                        }
                    },
                    {
                        type: 'user delete', action: (data) => {
                            props.selectStudent(data);
                            props.changeModalState(MODAL_STATES.DELETE);
                        }
                    }
                ]}
                status={getStudentsStatus}
                color='green'
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    students: state.admin.students.students,
    selectedStudent: state.admin.students.selectedStudent,
    modalState: state.admin.students.modalState,
    getStudentsStatus: state.admin.students.getStudentsStatus,
    createStudentStatus: state.admin.students.createStudentStatus,
    updateStudentStatus: state.admin.students.updateStudentStatus,
    deleteStudentStatus: state.admin.students.deleteStudentStatus,
    studentForm: state.admin.students.studentForm
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(adminStudentsActions.adminStudentsChangeModalState(modalState)),
    selectStudent: (data) => dispatch(adminStudentsActions.selectStudent(data)),
    createStudent: (data) => dispatch(adminStudentsActions.createStudent(data)),
    updateStudent: (data) => dispatch(adminStudentsActions.updateStudent(data)),
    deleteStudent: (id) => dispatch(adminStudentsActions.deleteStudent(id)),
    inputChange: (id, type, value) => dispatch(adminStudentsActions.adminStudentsInputChange(id, type, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Students));