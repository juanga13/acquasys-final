import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
 
import { Form, Button, Dropdown, Input } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { weekdayConstTranslate, FIELD_TYPES, allWeekDaysValues } from '../../../utils/consts';
import ReactDatePicker from 'react-datepicker';
import './WeekdaysInput.scss';

const zeroHourMinuteDate = () => {
    let result = new Date();
    result.setHours(0);
    result.setMinutes(0);
    return result;
}

/**
 * 
 * @param {*} props 
 */
const WeekdaysInput = (props) => {
    const {
        values
    } = props;

    const [isNewDataValid, setIsNewDataValid] = useState(false);
    const [weekdays, setWeekdays] = useState([]);
    const [time, setTime] = useState(zeroHourMinuteDate());  // gives date but use only hour and hour in the handleAddWeekday
    const [duration, setDuration] = useState(0);

    // re-render if values change!
    useEffect(() => {
        setWeekdays(values);
    }, [props.values])

    // gets whatever the input does and send to props an array of weekdays
    /* weekdays [{…}, {…}, ..., {…}]
        {
            asWeekDay: "THURSDAY" -> constat to traduce
            day: "jueves" -> dont care
            duration: 90
            hour: 18 
            id: 483
            minutes: 30
        }
    */
    
    const handleDurationChange = (value) => {
        if (value <= 0) {
            setDuration(0);
            setIsNewDataValid(false)
        } else if (value > 1000) setDuration(1000);
        else setDuration(value);
        if (weekdays.length > 0 && duration > 0) setIsNewDataValid(true);
    }

    const handleAddWeekday = () => {
        props.onChange(weekdays.map(weekday => ({
            asWeekDay: weekday,
            day: '',  // i dont care, use weekday value
            duration: duration,
            hour: time.getHours(),
            id: 0,  // i cant create a id
            minutes: time.getMinutes()
        })).concat(values));
    }

    const allWeekDays = allWeekDaysValues.map(weekday => (
        {
            key: weekday,
            text: I18n.t('common.weekdays.' + weekday.toLowerCase()),
            value: weekday
        }
    ));
    return (
        <Form.Group>
            <ul>
                {values.map((weekday, i) => (<li key={'weekday-list-item-' + i}>{
                    I18n.t('common.weekdays.' + weekday.asWeekDay.toLowerCase()) +
                    ' ' + I18n.t('common.other.atHour', {hour: weekday.hour, minutes: weekday.minutes === 0 ? '00' : weekday.minutes}) +
                    ' - ' + I18n.t('common.other.duration') + ': ' + weekday.duration + ' ' + I18n.t('common.other.minutes') + '.'
                }</li>))}
            </ul>
            <div className='weekdays-input-add-container'>
                <Dropdown
                    placeholder={I18n.t('common.inputs.weekdaysInput.weekdaySelect')}
                    multiple
                    search
                    selection
                    options={allWeekDays}
                    onChange={(e, data) => setWeekdays(data.value)}
                />
                <ReactDatePicker
                    selected={time}
                    onChange={date => setTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption={I18n.t('common.inputs.weekdaysInput.hour')}
                    timeFormat="HH:mm"
                    dateFormat="hh:mm"
                />
                <p>{I18n.t('common.inputs.weekdaysInput.duration')}</p>
                <Input
                    value={duration}
                    type={FIELD_TYPES.NUMBER}
                    label={I18n.t('common.other.minutes')}
                    labelPosition='right'
                    onChange={(e, data) => handleDurationChange(data.value)}
                />
                <Button color='green' disabled={!isNewDataValid} onClick={handleAddWeekday}>{I18n.t('common.inputs.weekdaysInput.add')}</Button>
            </div>
        </Form.Group>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (state) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(WeekdaysInput);