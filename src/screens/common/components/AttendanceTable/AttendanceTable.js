import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Dimmer, Header, Icon, Image, Loader, Table } from 'semantic-ui-react';
import { dummyAvatar } from '../../../../assets';
import { dateToSimple } from '../../../../utils/dateUtils';
import AttendanceCheckbox, { CHECKED_STATE } from './AttendanceCheckbox';
import './AttendanceTable.scss';


const AttendanceTable = (props) => {
    const {
        loading, error, attendances,
        lessonId, previewMode,
        // onSetAttendance, function
    } = props;
    const {
        attendance, //Attendances
        possibleDates, // array of numbers
        students, // array of students object 
    } = attendances;
    const sortedStudents = students ? students.sort((a, b) => (a.dni - b.dni)) : []

    if (error) {
        return (
            <div className='attendance-table-container'>
                <Header disabled>{I18n.t('common.table.error.dataError')}</Header>
            </div>
        );
    } else {
        return (
            <div className='attendance-table-container'>
                <Dimmer active={loading} inverted><Loader inverted/></Dimmer>
                <Table color='blue' inverted striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{I18n.t('common.table.studentColumn')}</Table.HeaderCell>
                            {possibleDates.map((date, i) => (
                                <Table.HeaderCell className='attendance-header-cell' key={`attendance-header-cell_${i}`}>
                                    {dateToSimple(date)}
                                </Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sortedStudents.map((student) => (
                            <Table.Row key={`attendance-row_${student.id}`}>
                                <Table.Cell className={`attendance-row-student-info`}>
                                    <Header as='h4' image>
                                        <Image src={student.avatarUrl || dummyAvatar} rounded size='mini' />
                                        <Header.Content inverted>
                                            {`${student.name}`}
                                            <Header.Subheader>
                                                {` ${student.surname}`}
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                {possibleDates.map((date) => {
                                    const present = attendance[date].find((attStudent) => attStudent.id === student.id);
                                    return (
                                        <Table.Cell key={`attendance_${student.id}_${date}`}>
                                            <AttendanceCheckbox
                                                checkedState={present ? CHECKED_STATE.PRESENT : CHECKED_STATE.ABSENT}
                                                onChange={(state) => !previewMode && props.onSetAttendance({
                                                    date, lessonId,
                                                    present: (!present),
                                                    studentId: student.id
                                                })}
                                                previewMode={previewMode}
                                            />
                                        </Table.Cell>
                                    )
                                })}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(AttendanceTable);
