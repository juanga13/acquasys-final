import React from 'react';
 
import { FIELD_TYPES, GENRES } from '../../../../utils/consts';
import { Form } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";

import { dummyAvatar } from '../../../../assets';
import WeekdaysInput from '../WeekdaysInput/WeekdaysInput';
import './MyFormInput.scss';


registerLocale("es", es); // date picker to spanish

const MyFormInput = (props) => {
    const {
        id,
        value,
        error,
        type,
        placeholder,
        required,

        // only for date inputs
        maxDate,
        minDate,
    } = props;

    switch (type) {
        case FIELD_TYPES.DATE:
            return (
                <div className='date-picker-container'>
                    <ReactDatePicker
                        id={id}
                        selected={value}
                        minDate={minDate} maxDate={maxDate}
                        dateFormat="dd MMMMMMMMMMMM yyyy" // mucho MMM para que entre cualquier mes
                        locale='es'
                        placeholderText={I18n.t(placeholder)}
                        onChange={date => props.onChange(id, type, date.getTime())}
                    />
                    {error && <div className='date-picker-error'>Fecha invalida</div>}
                </div>
            );

        case FIELD_TYPES.BOOLEAN:
            // por ahora solo sex field
            if (id === 'sex') {
                const options = [
                    { key: GENRES.FEMENINE, text: I18n.t('common.input.sex.' + GENRES.FEMENINE), value: I18n.t('common.input.sex.' + GENRES.FEMENINE) },
                    { key: GENRES.MASCULINE, text: I18n.t('common.input.sex.' + GENRES.MASCULINE), value: I18n.t('common.input.sex.' + GENRES.MASCULINE) }
                ];
                return (
                    <Form.Dropdown
                        id={id}
                        value={value}
                        error={error}
                        options={options}
                        placeholder={I18n.t(placeholder)}
                        onChange={(e, data) => props.onChange(id, type, data.value)}
                    />
                );
            } else if (id === 'verified') {
                return (
                    <Form.Checkbox
                        toggle
                        id={id}
                        checked={value}
                        // error={error}
                        // type={type}
                        // placeholder={I18n.t(placeholder)}
                        onChange={(e, data) => props.onChange(id, type, data.checked)}
                    />
                );
            }

        case FIELD_TYPES.TEXT_AREA:
            return (
                <Form.TextArea
                    id={id}
                    value={value}
                    error={error}  // TODO no lo tiene
                    placeholder={I18n.t(placeholder)}
                    onChange={(e, data) => props.onChange(id, type, data.value)}
                    className='textarea'
                />
            );

        case FIELD_TYPES.NULL:
            if (id === 'students') {
                const allStudents = props.students.map(student => (
                    { 
                        key: student.id,  // key 
                        text: student.name + ', ' + student.surname + ' (DNI ' + student.dni + ')',  // text
                        value: student.id,  // value
                        image: { avatar: true, src: dummyAvatar }  // image 
                    }
                ));
                const selectedStudents = value.map(student => student.id);
                return (
                    <Form.Dropdown
                        placeholder={I18n.t(placeholder)}
                        fluid
                        multiple
                        search
                        selection
                        defaultValue={selectedStudents}
                        options={allStudents}
                        /* array of student ids */
                        onChange={(e, data) => props.onChange(id, type, data.value)}
                        /* array of student objects */
                        // onChange={(e, studentIdArray) => {
                        //     var result = [];
                        //     studentIdArray.value.forEach(studentId => (
                        //         result.push(props.students.find(student => student.id === studentId))
                        //     ));
                        //     props.onChange(id, type, result);
                        // }}
                    />
                );
            } else if (id === 'teachers') {
                const allTeachers = props.teachers.map(teacher => (
                    { 
                        key: teacher.id,  // key 
                        text: teacher.name + ', ' + teacher.surname + ' (DNI ' + teacher.cuil + ')',  // text
                        value: teacher.id,  // value
                        image: { avatar: true, src: dummyAvatar }  // image 
                    }
                ));
                const selectedTeachersIds = value.map(teacher => teacher.id);
                return (
                    <Form.Dropdown
                        placeholder={I18n.t(placeholder)}
                        // fluid
                        multiple
                        search
                        selection
                        defaultValue={selectedTeachersIds}
                        options={allTeachers}
                        /* array of teacher ids */
                        onChange={(e, data) => props.onChange(id, type, data.value)}
                        /* array of teacher objects */
                        // onChange={(e, teacherIdArray) => {
                        //     var result = [];
                        //     teacherIdArray.value.forEach(teacherId => (
                        //         result.push(props.teachers.find(teacher => teacher.id === teacherId))
                        //     ));
                        //     props.onChange(id, type, result);
                        // }}
                    />
                );
            } else if (id === 'weekdays') {
                return (
                    <WeekdaysInput 
                        values={value} 
                        onChange={(values => props.onChange(id, type, values))}
                    />
                );
            } else if (id === 'student') {
                const allStudents = props.students.map(student => (
                    { 
                        key: student.id,  // key 
                        text: student.name + ', ' + student.surname + ' (DNI ' + student.dni + ')',  // text
                        value: student.id,  // value
                        image: { avatar: true, src: dummyAvatar }  // image 
                    }
                ));
                return (
                    <Form.Dropdown
                        placeholder={I18n.t(placeholder)}
                        fluid
                        search
                        selection
                        clearable
                        defaultValue={value && value.id}
                        options={allStudents}
                        // en el caso de crear un payment el back me pide studentId
                        onChange={(e, data) => props.onChange(id, type, data.value)}
                    />
                );
            } else return null;

        // FIELD_TYPES.STRING
        // FIELD_TYPES.PASSWORD
        // FIELD_TYPES.NUMBER
        // FIELD_TYPES.EMAIL
        default:
            return (
                <Form.Input
                    id={id}
                    value={value || ''}
                    error={error}
                    placeholder={I18n.t(placeholder)}
                    type={type}
                    // disabled={type === FIELD_TYPES.EMAIL} // disable editing email field because doesnt work in back
                    onChange={(e) => props.onChange(id, type, e.target.value)}
                />
            );
    }
};

export default MyFormInput;