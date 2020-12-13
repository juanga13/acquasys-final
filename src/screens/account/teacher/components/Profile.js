import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Header, Divider, Image, Card, Button, Icon, Label, List } from 'semantic-ui-react';
import { dummyAvatar } from '../../../../assets';
import { MODAL_STATES, MODAL_TYPES } from '../../../../utils/consts';
import { ModalPreview } from '../../../common/components/Modals';
import teacherActions from '../teacher.actions';

const Profile = (props) => {
    const {
        profile,
        myData,
        modalState,
        // calendar
    } = props;
    
    // const lessonsThisWeek = () => {
    //     const curr = new Date();
    //     const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    //     const last = first + 6; // last day is the first day + 6
    //     const firstday = new Date(curr.setDate(first)).getTime();
    //     const lastday = new Date(curr.setDate(last)).getTime();
    //     const results = calendar.filter((lesson) => (
    //         (lesson.start >= firstday && lesson.start <= lastday && lesson.end >= firstday && lesson.end <= lastday)
    //     ));
    //     return results;
    // };
    // 
    // const renderTodaysWeekLessons = () => {
    //     const list = lessonsThisWeek();
    //     // console.log(calendar, list);
    //     return (
    //         <List>
    //             {list.length === 0 ? 
    //                 <div className='label-container'>
    //                     <Icon color='red' name='close'/>
    //                     <p>{I18n.t('common.myProfile.teacher.texts.noLessonsThisWeek')}</p>
    //                 </div>
    //                 :
    //                 list.map((lesson) => (
    //                     <List.Item>
    //                         <List.Content>
    //                             <List.Header>{lesson.title}</List.Header>
    //                         </List.Content>
    //                         <List.Description>
    //                             <div className='todays-lessons-list-item'>
    //                                 <p className='bold'>Inicio:</p>
    //                                 <p>{new Date(lesson.start).toLocaleDateString('es-ES', 
    //                                     {day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'})}</p>
    //                                 <p className='bold'>Fin:</p>
    //                                 <p>{new Date(lesson.end).toLocaleDateString('es-ES',
    //                                     {day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric'})}</p>
    //                             </div>
    //                         </List.Description>
    //                     </List.Item>
    //                 ))
    //             }
    //         </List>
    //     );
    // };

    return (
        <div className='section-container'>
            {/* <ModalEdit
                key='modal-edit'
                isOpen={modalState === MODAL_STATES.EDIT}
                type={MODAL_TYPES.STUDENT_PROFILE}
                form={form}
                status={updateMyDataStatus}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onVerify={(id) => props.verifyStudent(id)}
                onChange={(id, type, value) => props.inputChange(id, type, value)}
                onCancel={() => props.changeModalState(MODAL_STATES.PREVIEW)}
                onSubmit={() => props.updateMyData()}
                showImage
            /> */}
            <ModalPreview
                key='modal-preview'
                isOpen={modalState === MODAL_STATES.PREVIEW}
                type={MODAL_TYPES.TEACHER_PROFILE}
                data={myData}
                onClose={() => props.changeModalState(MODAL_STATES.CLOSED)}
                onEdit={() => props.changeModalState(MODAL_STATES.EDIT)}
                showImage
                noEditOption
            />
            <div className='section-header-container'>
                <Header>{I18n.t('common.myProfile.title')}</Header>
            </div>
            <Divider hidden/>
            <div className='section-content-container'>
                <div className='profile-image-data-container'>
                    <Image src={myData.avatarUrl || dummyAvatar} size='small' circular />
                    <div className='profile-data-container'>
                        <Card fluid>
                            <Card.Content textAlign='right'>
                                <Card.Header>{`${profile.name} ${profile.surname}`}</Card.Header>
                                <Card.Meta>{I18n.t('teacher.profile.meta')}</Card.Meta>
                                <Card.Description>{profile.email}</Card.Description>
                            </Card.Content>
                            <Card.Content textAlign='right'>
                                <Button as='div' labelPosition='right'>
                                    <Button color='blue'  onClick={() => props.changeModalState(MODAL_STATES.PREVIEW)}>
                                        <Icon name='eye' />
                                        {I18n.t('teacher.profile.myData')}
                                    </Button>
                                </Button>
                            </Card.Content>
                        </Card>
                    </div>
                </div>
                {/* <Card  fluid>
                    <Card.Content>
                        <Card.Header>{I18n.t('teacher.profile.lessons.header')}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {renderTodaysWeekLessons()}
                    </Card.Content>
                </Card> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({ profile: state.session.profile,
    modalState: state.teacher.modalState,
    myData: state.teacher.myData,
    // calendar: state.teacher.calendar,
});

const mapDispatchToProps = (dispatch) => ({
    changeModalState: (modalState) => dispatch(teacherActions.changeModalState(modalState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);