import React from 'react';
import { Icon, Card, Image, List } from 'semantic-ui-react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import { dummyAvatar } from '../../../../../assets';
import './Profile.scss';


const AdminProfile = (props) => {
    const {
        profile,
        allStudents,
        calendar,
        lessons,
        payments,
    } = props;
    const unverifiedStudents = allStudents.filter(student => !student.verified);
    // const todoPayments = calendar.map(())
    /* 
        allday: false
        end: 1578421800000
        lessonId: 444
        start: 1578418200000
        title: "Natacion"
    */
    
    const lessonsThisWeek = () => {
        const curr = new Date();
        const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        const last = first + 6; // last day is the first day + 6
        const firstday = new Date(curr.setDate(first)).getTime();
        const lastday = new Date(curr.setDate(last)).getTime();
        const results = calendar.filter((lesson) => (
            (lesson.start >= firstday && lesson.start <= lastday && lesson.end >= firstday && lesson.end <= lastday)
        ));
        return results;
    };

    const renderTodaysWeekLessons = () => {
        const list = lessonsThisWeek();
        console.log(calendar, list);
        return (
            <List>
                {list.length === 0 ? 
                    <div className='label-container'>
                        <Icon color='red' name='close'/>
                        <p>{I18n.t('common.myProfile.admin.texts.noLessonsThisWeek')}</p>
                    </div>
                    :
                    list.map((lesson) => (
                        <List.Item>
                            <List.Content>
                                <List.Header>{lesson.title}</List.Header>
                            </List.Content>
                            <List.Description>
                                <div className='pending-verification-student-list-item'>
                                    <p className='bold'>Inicio:</p>
                                    <p>{new Date(lesson.start).toLocaleDateString('es-ES', 
                                        {day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'})}</p>
                                    <p className='bold'>Fin:</p>
                                    <p>{new Date(lesson.end).toLocaleDateString('es-ES',
                                        {day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'})}</p>
                                </div>
                            </List.Description>
                        </List.Item>
                    ))
                }
            </List>
        );
    }

    return (
        <div className='section-container'>
            <div className='section-content-container'>
                <div className='profile-image-data-container'>
                    <Image src={
                        // myData.avatarUrl ||
                        dummyAvatar} size='small' circular />
                    <div className='profile-data-container'>
                        <Card fluid>
                            <Card.Content textAlign='right'>
                                <Card.Header>{`${profile.name} ${profile.surname}`}</Card.Header>
                                <Card.Meta>{I18n.t('admin.profile.meta')}</Card.Meta>
                                <Card.Description>{profile.email}</Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('common.myProfile.admin.titles.verificationsPending')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <List>
                            {unverifiedStudents.length === 0 ? 
                                <div className='label-container'>
                                    <Icon color='red' name='close'/>
                                    <p>{I18n.t('common.myProfile.admin.texts.noVerifiedAccount')}</p>
                                </div>
                                :
                                unverifiedStudents.map(student => (
                                    <List.Item>
                                        <Image avatar src={student.avatarUrl || dummyAvatar} />
                                        <List.Content>
                                            <List.Header>{`${student.name} ${student.surname}`}</List.Header>
                                            <List.Description>
                                                <div className='pending-verification-student-list-item'>
                                                    <p className='bold'>DNI:</p>
                                                    <p>{student.dni}</p>
                                                    <p className='bold'>E-mail:</p>
                                                    <p>{student.email}</p>
                                                </div>
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.lessons.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {renderTodaysWeekLessons()}
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.payments.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        todo
                    </Card.Content>
                </Card>
                <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('admin.profile.payments.next.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        todo
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    profile: state.session.profile,
    allStudents: state.admin.students.students,
    lessons: state.admin.lessons.lessons,
    payments: state.admin.payments.payments,
    calendar: state.admin.calendar.calendar,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
