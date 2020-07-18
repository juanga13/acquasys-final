import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Segment, Label, Icon } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import ModalDelete from '../../../../common/components/Modals/ModalDelete';
import { MODAL_STATES, MODAL_TYPES, REQUEST_STATUS } from '../../../../../utils/consts';
import adminPaymentsActions from '../admin.payments.actions';
import MyTable from '../../../../common/components/MyTable';
import { dummyAvatar } from '../../../../../assets';


const Payments = (props) => {
    const {
        payments,
        fee,
        selectedPayment,
        modalState,
        getPaymentsStatus,
        createPaymentStatus,
        updatePaymentStatus,
        deletePaymentStatus,
        getFeeStatus,
        setFeeStatus,
        paymentForm
    } = props;
    const isFeeSegmentLoading = (getFeeStatus === REQUEST_STATUS.LOADING || setFeeStatus === REQUEST_STATUS.LOADING);

    const renderModals = () => {
        return ([
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW} 
                type={MODAL_TYPES.ADMIN_PAYMENT}
                data={selectedPayment}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                noEditOption
            />,
            // ModalEdit with not null data is a new payment
            <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}    
                type={MODAL_TYPES.ADMIN_PAYMENT}
                form={paymentForm}
                loading={updatePaymentStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, value) => props.inputChange(id, value)}
                onCancel={() => {  // user cancel edition and goes back to preview mode
                    props.changeModalState(MODAL_STATES.PREVIEW);
                }}
                onSubmit={() => props.updatePayment()}
                students={props.students}  // all students available
                teachers={props.teachers}  // all teachers available
            />,
            <ModalCreate
                key='modal-create'
                isOpen={modalState === MODAL_STATES.CREATE}
                form={paymentForm}
                type={MODAL_TYPES.ADMIN_PAYMENT}
                loading={createPaymentStatus === REQUEST_STATUS.LOADING}
                error={createPaymentStatus === REQUEST_STATUS.ERROR}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, value) => props.inputChange(id, value)}
                onSubmit={(data) => props.createPayment(data)}  // triggers selectedPayment if success and opens preview
            />,
            <ModalDelete
                key='modal-delete'
                isOpen={modalState === MODAL_STATES.DELETE}
                type={MODAL_TYPES.ADMIN_PAYMENT}
                data={selectedPayment}
                loading={deletePaymentStatus === REQUEST_STATUS.LOADING}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onSubmit={() => props.deletePayment(selectedPayment.id)}
            />
        ])
    };

    return (
        <div className='section-container'>
            {renderModals()}
            <div className='section-header-container'>
                <Header floated='right'>{I18n.t('admin.payments.title')}</Header>
                <Header floated='left' >
                    <Button color='grey' size='medium' onClick={() => props.changeModalState(MODAL_STATES.CREATE)}>
                        {I18n.t('admin.payments.buttons.newPayment')}
                    </Button>
                    {/* apparently without image changes the style of the label texts xD */}
                    <Button as='div' labelPosition='left'>
                        <Button icon pointing='right'><Icon name='heart' />{I18n.t('admin.payments.feeAmount')}</Button>
                        <Label basic pointing='right'>{fee + ' $'}</Label>
                        <Button icon><Icon name='heart' />{I18n.t('admin.payments.feeAmount')}</Button>
                    </Button>
                </Header>
            </div>
            {/* 0:
                amount: 2000
                date: "2020-06-02T03:00:00.000+0000"
                payed: false
                student: {id: 429, email: "Marcos543@student.com", password: "$2a$10$t68SxBU5MMCFEEspR10v4eqGdXc4Cz.yxWNkJhLuupaBefS1kHnL.", name: "Marcos", surname: "Fernandez", …}
            _ */}
            <MyTable
                data={payments}
                columns={['name', 'surname', 'dni', 'amount', 'date']}
                actions={[
                    { type: 'file alternate', action: (data) => {
                        props.selectPayment(data);
                        props.changeModalState(MODAL_STATES.PREVIEW);
                    }},
                    // { type: 'user delete', action: (data) => {
                    //     props.selectPayment(data);
                    //     props.changeModalState(MODAL_STATES.DELETE);
                    // }}
                ]}
                status={getPaymentsStatus}
                color='grey'
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    payments: state.admin.payments.payments,
    fee: state.admin.payments.fee,
    selectedPayment: state.admin.payments.selectedPayment,
    modalState: state.admin.payments.modalState,
    getPaymentsStatus: state.admin.payments.getPaymentsStatus,
    createPaymentStatus: state.admin.payments.createPaymentStatus,
    updatePaymentStatus: state.admin.payments.updatePaymentStatus,
    deletePaymentStatus: state.admin.payments.deletePaymentStatus,
    paymentForm: state.admin.payments.paymentForm,
    getFeeStatus: state.admin.payments.getFeeStatus,
    setFeeStatus: state.admin.payments.setFeeStatus,
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(adminPaymentsActions.adminPaymentsChangeModalState(modalState)),
    selectPayment: (data) => dispatch(adminPaymentsActions.selectPayment(data)),
    createPayment: (data) => dispatch(adminPaymentsActions.createPayment(data)),
    updatePayment: (data) => dispatch(adminPaymentsActions.updatePayment(data)),
    deletePayment: (id) => dispatch(adminPaymentsActions.deletePayment(id)),
    inputChange: (id, value) => dispatch(adminPaymentsActions.adminPaymentsInputChange(id, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payments));
