import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Button, Label, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { ModalPreview, ModalEdit, ModalCreate, ModalDelete } from '../../../common/components/Modals';
import { MODAL_STATES, MODAL_TYPES, REQUEST_STATUS, FIELD_TYPES } from '../../../../utils/consts';
import adminPaymentsActions from '../student.actions';
import MyTable from '../../../common/components/MyTable';
import fireToast from '../../../common/components/Toaster';
import './Payment.scss';
import ReactDatePicker from 'react-datepicker';


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
    // fee
    const [newFee, setNewFee] = useState('');
    const isFeeSegmentLoading = (getFeeStatus === REQUEST_STATUS.LOADING || setFeeStatus === REQUEST_STATUS.LOADING);

    // table search inputs
    const [searchText, setsearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const filteredPayments = payments.filter(payment => (payment.name.includes(searchText) ||
        payment.surname.includes(searchText) || payment.dni.toString().includes(searchText)) && 
        (startDate ? startDate <= payment.date : true || endDate ? endDate >= payment.date : true ));

    useEffect(() => {}, [props.fee])

    useEffect(() => {
        console.log('create payment effect');
        if (createPaymentStatus === REQUEST_STATUS.SUCCESS) fireToast(I18n.t('admin.payments.success.create.title'), I18n.t('admin.payments.success.create.description'), 'success', 'check');
        if (createPaymentStatus === REQUEST_STATUS.ERROR) fireToast(I18n.t('admin.payments.error.create.title'), I18n.t('admin.payments.error.create.description'), 'error', 'warning');
        // if (updatePaymentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.payments.success.update.title'), I18n.t('admin.payments.success.update.description'), 'success', 'check' );
        // if (updatePaymentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.payments.error.update.title'), I18n.t('admin.payments.error.update.description'), 'error', 'warning' );
        // if (deletePaymentStatus === REQUEST_STATUS.SUCCESS) fireToast( I18n.t('admin.payments.success.delete.title'), I18n.t('admin.payments.success.delete.description'), 'success', 'check' );
        // if (deletePaymentStatus === REQUEST_STATUS.ERROR) fireToast( I18n.t('admin.payments.error.delete.title'), I18n.t('admin.payments.error.delete.description'), 'error', 'warning' );
    }, [props.createPaymentStatus]);
    // }, [props.createPaymentStatus, props.updatePaymentStatus, props.deletePaymentStatus]);

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
                    <div className='fee-items-container'>
                        <Input
                            type='number'
                            size='mini'
                            placeholder={I18n.t('admin.payments.insertNewFee')}
                            onChange={(e, data) => setNewFee(data.value)}
                            action
                            loading={isFeeSegmentLoading}
                        >
                            <input/>
                            <Button
                                icon='arrow right'
                                onClick={() => console.log(newFee)}
                            />
                        </Input>
                        <Label size='big'>
                            {I18n.t('admin.payments.feeAmount') + ': ' + fee + ' $'}
                        </Label>
                    </div>
                </Header>
            </div>
            <div className='section-header-container-2'>
                <h4>Filtros: </h4>
                <Input
                    id='table-search-input'
                    placeholder={I18n.t('admin.payments.searchName')}
                    value={searchText}
                    type={FIELD_TYPES.STRING}
                    onChange={(e, data) => setsearchText(data.value)}
                />
                <ReactDatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    endDate={endDate}
                    startDate={startDate}
                    className='table-date-input'
                    placeholderText={I18n.t('admin.lessons.searchStartDate')}
                    />
                <ReactDatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    endDate={endDate}
                    startDate={startDate}
                    className='table-date-input'
                    placeholderText={I18n.t('admin.lessons.searchEndDate')}
                />
            </div>
            <MyTable
                data={filteredPayments}
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
