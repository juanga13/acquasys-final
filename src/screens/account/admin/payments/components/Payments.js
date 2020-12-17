import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Label, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import ModalPreview from '../../../../common/components/Modals/ModalPreview';
import ModalCreate from '../../../../common/components/Modals/ModalCreate';
import { MODAL_STATES, MODAL_TYPES, REQUEST_STATUS, FIELD_TYPES } from '../../../../../utils/consts';
import adminPaymentsActions from '../admin.payments.actions';
import MyTable from '../../../../common/components/MyTable/MyTable';
import fireToast from '../../../../common/components/Toaster';
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
        // updatePaymentStatus,
        // deletePaymentStatus,
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
    const getFilteredPayments = () => {
        return payments.filter(payment => {
            if(!payment.name)
                return false;
            if(payment.payed)
                return false;
            const date = new Date(payment.date);
            const a = payment.name.toLowerCase().includes(searchText);
            const b = payment.surname.toLowerCase().includes(searchText);
            const c = payment.dni.toString().includes(searchText);
            const dateIsAfterStartDate = (startDate !== null ? date >= startDate : true);
            const dateIsBeforeEndDate = (endDate !== null ? date <= endDate : true);
            return (a || b || c) && (dateIsAfterStartDate && dateIsBeforeEndDate);
        })
    };
    const filteredPayments = getFilteredPayments();

    useEffect(() => {}, [props.fee])

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
            <ModalCreate
                key='modal-create'
                isOpen={modalState === MODAL_STATES.CREATE}
                form={paymentForm}
                type={MODAL_TYPES.ADMIN_PAYMENT}
                loading={createPaymentStatus === REQUEST_STATUS.LOADING}
                error={createPaymentStatus === REQUEST_STATUS.ERROR}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onSubmit={(data) => props.createPayment(data)}  // triggers selectedPayment if success and opens preview
                students={props.students}
            />,
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
                                onClick={() => props.setFee(newFee)}
                            />
                        </Input>
                        <Label size='big'>
                            {I18n.t('admin.payments.feeAmount') + ': ' + fee + ' $'}
                        </Label>
                    </div>
                </Header>
            </div>
            <div className='section-header-container-2'>
                <Header as='h4'>{I18n.t('admin.payments.filters')}</Header>
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
                    isClearable
                    endDate={endDate}
                    startDate={startDate}
                    className='table-date-input'
                    placeholderText={I18n.t('admin.lessons.searchStartDate')}
                    />
                <ReactDatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    isClearable
                    endDate={endDate}
                    startDate={startDate}
                    className='table-date-input'
                    placeholderText={I18n.t('admin.lessons.searchEndDate')}
                />
            </div>
            <MyTable
                data={filteredPayments}
                noResults={filteredPayments.length === 0 && (searchText.length > 0 ||
                    startDate !== null || endDate !== null)}
                columns={['name', 'surname', 'dni', 'amount', 'date']}
                actions={[
                    {
                        type: 'file alternate', action: (data) => {
                            props.selectPayment(data);
                            props.changeModalState(MODAL_STATES.PREVIEW);
                        }
                    },
                ]}
                status={getPaymentsStatus}
                color='grey'
                defaultSort='date'
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
    students: state.admin.students.students
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(adminPaymentsActions.adminPaymentsChangeModalState(modalState)),
    selectPayment: (data) => dispatch(adminPaymentsActions.selectPayment(data)),
    createPayment: (data) => dispatch(adminPaymentsActions.createPayment(data)),
    updatePayment: (data) => dispatch(adminPaymentsActions.updatePayment(data)),
    deletePayment: (id) => dispatch(adminPaymentsActions.deletePayment(id)),
    inputChange: (id, type, value) => dispatch(adminPaymentsActions.adminPaymentsInputChange(id, type, value)),
    setFee: (fee) => dispatch(adminPaymentsActions.setFee(fee))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
