import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Segment, Label, Icon, Dimmer, Loader, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalEdit from '../../../../common/components/Modals/ModalEdit';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import ModalDelete from '../../../../common/components/Modals/ModalDelete';
import { MODAL_STATES, MODAL_TYPES, REQUEST_STATUS } from '../../../../../utils/consts';
import adminPaymentsActions from '../admin.payments.actions';
import MyTable from '../../../../common/components/MyTable';
import { dummyAvatar } from '../../../../../assets';
import fireToast from '../../../../common/components/Toaster';


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
    const [newFee, setNewFee] = useState('');
    const isFeeSegmentLoading = (getFeeStatus === REQUEST_STATUS.LOADING || setFeeStatus === REQUEST_STATUS.LOADING);

    useEffect(() => {}, [props.fee])

    useEffect(() => {
        console.log('create payment effect');
        if (createPaymentStatus === REQUEST_STATUS.SUCCESS) fireToast(I18n.t('admin.payments.success.create.title'), I18n.t('admin.payments.success.create.description'), 'success', 'check');
        if (createPaymentStatus === REQUEST_STATUS.ERROR) fireToast(I18n.t('admin.payments.error.create.title'), I18n.t('admin.payments.error.create.description'), 'error', 'warning');
    }, [props.createPaymentStatus]);

    // useEffect(() => {
    //     console.log('update payment effect');
    //     if (updatePaymentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.payments.success.update.title'), I18n.t('admin.payments.success.update.description'), 'success', 'check' );
    //     if (updatePaymentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.payments.error.update.title'), I18n.t('admin.payments.error.update.description'), 'error', 'warning' );
    // }, [props.updatePaymentStatus]);

    // useEffect(() => {
    //     console.log('delete payment effect');
    //     if (deletePaymentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.payments.success.delete.title'), I18n.t('admin.payments.success.delete.description'), 'success', 'check' );
    //     if (deletePaymentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.payments.error.delete.title'), I18n.t('admin.payments.error.delete.description'), 'error', 'warning' );
    // }, [props.deletePaymentStatus]);

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
                    <Input
                        size='mini'
                        value={newFee}
                        placeholder={I18n.t('admin.payments.insertNewFee')}
                        onChange={(e, data) => setNewFee(data.value)}
                    />
                    <Button as='div' labelPosition='right' onClick={() => props.setFee(newFee)}>
                        <Button>{I18n.t('admin.payments.setFeeAmount')}</Button>
                        <Label as='a' basic pointing='left'>
                            {I18n.t('admin.payments.feeAmount') + ': ' + fee + ' $'}
                        </Label>
                    </Button>
                </Header>
            </div>
            <MyTable
                data={payments}
                columns={['name', 'surname', 'dni', 'amount', 'date']}
                actions={[
                    {
                        type: 'file alternate', action: (data) => {
                            props.selectPayment(data);
                            props.changeModalState(MODAL_STATES.PREVIEW);
                        }
                    },
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
    inputChange: (id, value) => dispatch(adminPaymentsActions.adminPaymentsInputChange(id, value)),
    setFee: (fee) => dispatch(adminPaymentsActions.setFee(fee))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Payments));
