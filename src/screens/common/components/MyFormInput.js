import React from 'react';
import { withRouter } from 'react-router-dom';
import { FIELD_TYPES, GENRES, allWeekDaysValues } from '../../../utils/consts';
import { Form, Checkbox, Dropdown } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import ReactDatePicker from 'react-datepicker';
import { dummyAvatar } from '../../../assets';
import WeekdaysInput from './WeekdaysInput';

const MyFormInput = (props) => {
    const {
        id,
        value,
        error,
        type,
        placeholder,
    } = props;

    switch (type) {
        case FIELD_TYPES.DATE:
            return (
                <ReactDatePicker
                    id={id}
                    selected={value}
                    // error
                    // type
                    placeholderText={I18n.t(placeholder)}
                />
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
                        onChange={(e, data) => props.onChange(id, data.value)}
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
                        onChange={(e, data) => props.onChange(id, data.checked)}
                    />
                );
            }

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
                        onChange={(e, data) => props.onChange(id, data.value)}
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
                const selectedTeachers = value.map(teacher => teacher.id);
                return (
                    <Form.Dropdown
                        placeholder={I18n.t(placeholder)}
                        fluid
                        multiple
                        search
                        selection
                        defaultValue={selectedTeachers}
                        options={allTeachers}
                        onChange={(e, data) => props.onChange(id, data.value)}
                    />
                );
            } else if (id === 'weekdays') {
                return (
                    <WeekdaysInput 
                        values={value} 
                        onChange={(values => props.onChange(id, values))}
                    />
                );
            } else if (id === 'student') {
                return (
                    <Form.Field>

                    </Form.Field>
                )
            } else return null;

        // FIELD_TYPES.STRING
        // FIELD_TYPES.PASSWORD
        // FIELD_TYPES.NUMBER
        // FIELD_TYPES.EMAIL
        default:
            return (
                <Form.Input
                    id={id}
                    value={value}
                    error={error}
                    placeholder={I18n.t(placeholder)}
                    type={type}
                    onChange={(e) => props.onChange(id, e.target.value)}
                />
            );
    }
};

export default withRouter(MyFormInput);