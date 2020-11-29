import React from 'react';
import { connect } from 'react-redux';
 
import { Modal, Button, Icon, Image, Divider } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { dummyAvatar } from '../../../../assets';
import { MODAL_TYPES, weekdayConstTranslate } from '../../../../utils/consts';
import './modals.scss'
import { sortData } from '../../../../utils/sortData';

/**
 * 
 * @param {object} props:
 * - isOpen -> boolean
 * - onClose -> triggers onclose to parent
 * - loading -> boolean
 * - data -> data to render
 * - onEdit -> triggers change modal to edit
 * - type -> adminStudent/adminTeacher/adminLesson/adminPayment/studentLesson/studentPayment/teacherLesson
 */
const ModalPreview = (props) => {
    const {
        isOpen,
        data,
        type,
        showImage,
        noEditOption,
        loading
    } = props;
    const sortedData  = data ? sortData(type, data) : {};
    const keys = Object.keys(sortedData);
    const values = Object.values(sortedData);
    const titleData = data ? { name: data.name, surname: data.surname } : {};

    const renderValues = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_STUDENT:
                return values.map((value, i) => {
                    if (['id', 'role', 'complete', 'avatarUrl', 'password', 'verified'].some(value => value === keys[i])) {
                        return null;
                    } else {
                        return (
                            <div className='field-container' key={'modal-preview-item-' + i}>
                                <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                <p>
                                    {['inscriptionDate', 'birthday'].some(value => value === keys[i]) ?
                                        new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})
                                        :
                                        value
                                    }
                                </p>
                                <Divider hidden/>
                            </div>
                        );
                    }
                });

            case MODAL_TYPES.ADMIN_TEACHER:
                return values.map((value, i) => {
                    if (['id', 'role', 'avatarUrl', 'password'].some(value => value === keys[i])) {
                        return null;
                    } else {
                        return (
                            <div className='field-container' key={'modal-preview-item-' + i}>
                                <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                <p>{value}</p>
                                <Divider hidden/>
                            </div>
                        );
                    }
                });

            case MODAL_TYPES.ADMIN_LESSON:
                
                return values.map((value, i) => {
                    if (['id'].some(value => value === keys[i])) {
                        return null;
                    } else {
                        switch (keys[i]) {
                            case 'students': 
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                        <ul>
                                            {value.map((student, i) => (<li>{student.name + ', ' + student.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'teachers': 
                                return (
                                    
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>                                      
                                        <ul>
                                            {value.map((teacher, i) => (<li>{teacher.name + ', ' + teacher.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'weekdays':
                                return (
                                    
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                        <ul>
                                            {value.map((weekday, i) => (<li>{
                                                I18n.t('common.weekdays.' + weekday.asWeekDay.toLowerCase()) +
                                                ' ' + I18n.t('common.other.atHour', {hour: weekday.hour, minutes: weekday.minutes === 0 ? '00' : weekday.minutes}) +
                                                ' - ' + I18n.t('common.other.duration') + ': ' + weekday.duration + ' ' + I18n.t('common.other.minutes') + '.'
                                            }</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            default:
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                        <p>
                                            {['startDate', 'endDate'].some(value => value === keys[i]) ?
                                                new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})
                                                :
                                                value
                                            }
                                        </p>
                                        <Divider hidden/>
                                    </div>
                                );
                        }
                    }
                });

            case MODAL_TYPES.ADMIN_PAYMENT:
                return values.map((value, i) => {
                    if (['student'].some(value => value === keys[i])) {
                        return (
                            <div className='field-container' key={'modal-preview-item-' + i}>
                                <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                <p>
                                    {['date'].some(value => value === keys[i]) ?
                                        new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})
                                        :
                                        value
                                    }
                                </p>
                                <Divider hidden/>
                            </div>
                        );
                    } else {
                        return (
                            <div className='field-container' key={'modal-preview-item-' + i}>
                                <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                <p>
                                    {['date'].some(value => value === keys[i]) ?
                                        new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})        
                                        :
                                        (keys[i] === 'amount') ?
                                        value + ' $'
                                        : 
                                        value
                                    }
                                </p>
                                <Divider hidden/>
                            </div>
                        )
                    }
                });

            case MODAL_TYPES.STUDENT_LESSON:
                return values.map((value, i) => {
                    if (['id'].some(value => value === keys[i])) {
                        return null;
                    } else {
                        switch (keys[i]) {
                            case 'students': 
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                        <ul>
                                            {value.map((student, i) => (<li>{student.name + ', ' + student.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'teachers': 
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>                                      
                                        <ul>
                                            {value.map((teacher, i) => (<li>{teacher.name + ', ' + teacher.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'weekdays':
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <label>{I18n.t('forms.' + keys[i]) + ':'}</label>
                                        <ul>
                                            {value.map((weekday, i) => (<li>{
                                                I18n.t('common.weekdays.' + weekday.asWeekDay.toLowerCase()) +
                                                ' ' + I18n.t('common.other.atHour', {hour: weekday.hour, minutes: weekday.minutes === 0 ? '00' : weekday.minutes}) +
                                                ' - ' + I18n.t('common.other.duration') + ': ' + weekday.duration + ' ' + I18n.t('common.other.minutes') + '.'
                                            }</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            default:
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <p>{I18n.t('forms.' + keys[i]) + ':'}</p>
                                        <p>
                                            {['startDate', 'endDate'].some(value => value === keys[i]) ?
                                                new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})
                                                :
                                                value
                                            }
                                        </p>
                                        <Divider hidden/>
                                    </div>
                                );
                        }
                    }
                });

            case MODAL_TYPES.STUDENT_PAYMENT:
                return null;

            case MODAL_TYPES.TEACHER_LESSON:
                return values.map((value, i) => {
                    if (['id'].some(value => value === keys[i])) {
                        return null;
                    } else {
                        switch (keys[i]) {
                            case 'students': 
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <p>{I18n.t('forms.' + keys[i]) + ':'}</p>
                                        <ul>
                                            {value.map((student, i) => (<li>{student.name + ', ' + student.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'teachers': 
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <p>{I18n.t('forms.' + keys[i]) + ':'}</p>                                      
                                        <ul>
                                            {value.map((teacher, i) => (<li>{teacher.name + ', ' + teacher.surname}</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            case 'weekdays':
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <p>{I18n.t('forms.' + keys[i]) + ':'}</p>
                                        <ul>
                                            {value.map((weekday, i) => (<li>{
                                                I18n.t('common.weekdays.' + weekday.asWeekDay.toLowerCase()) +
                                                ' ' + I18n.t('common.other.atHour', {hour: weekday.hour, minutes: weekday.minutes === 0 ? '00' : weekday.minutes}) +
                                                ' - ' + I18n.t('common.other.duration') + ': ' + weekday.duration + ' ' + I18n.t('common.other.minutes') + '.'
                                            }</li>))}
                                        </ul>
                                        <Divider hidden/>
                                    </div>
                                );
                            default:
                                return (
                                    <div className='field-container' key={'modal-preview-item-' + i}>
                                        <p>{I18n.t('forms.' + keys[i]) + ':'}</p>
                                        <p>
                                            {['startDate', 'endDate'].some(value => value === keys[i]) ?
                                                new Date(value).toLocaleDateString('es-ES', {year:'numeric', month: 'long', day: 'numeric'})
                                                :
                                                value
                                            }
                                        </p>
                                        <Divider hidden/>
                                    </div>
                                );
                        }
                    }
                });

            default: return null;
        }
    };

    const getModalSize = () => {
        switch (type) {
            case MODAL_TYPES.ADMIN_STUDENT: return 'small';
            case MODAL_TYPES.ADMIN_TEACHER: return 'small';
            case MODAL_TYPES.ADMIN_LESSON: return 'small';
            case MODAL_TYPES.ADMIN_PAYMENT: return 'mini';
            case MODAL_TYPES.STUDENT_LESSON: return 'small';
            case MODAL_TYPES.STUDENT_PAYMENT: return 'mini';
            case MODAL_TYPES.TEACHER_LESSON: return 'small';
            default: return 'small';
        }
    };

    const getAttendancesButton = () => {
        if (type === MODAL_TYPES.ADMIN_LESSON || type === MODAL_TYPES.TEACHER_LESSON) {
            return (
                <Button color='brown'>
                    <Icon name='book'/>
                    {I18n.t('common.modals.preview.buttons.attendances')}
                    <Icon name='chevron right'/>
                </Button>
            );
        }
    };

    return (
        <Modal
            size={getModalSize()}
            open={isOpen}
            onClose={props.onClose}
            loading={loading}
        >
            <Modal.Header>{I18n.t('common.modals.preview.title.' + type, titleData)}</Modal.Header>
            <Modal.Content image>
                {showImage && <Image wrapped size='small' src={dummyAvatar} />}
                <Modal.Description>
                    {renderValues()}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={props.onClose}><Icon name='close' />{I18n.t('common.modals.preview.buttons.close')}</Button>
                {!noEditOption && 
                    <Button color='blue' onClick={props.onEdit}>
                        <Icon name='edit' />
                        {I18n.t('common.modals.preview.buttons.edit')}
                    </Button>
                }
                {getAttendancesButton()}
            </Modal.Actions>
        </Modal>
    );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ModalPreview);
