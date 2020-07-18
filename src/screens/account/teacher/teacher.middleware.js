import {

} from './teacher.actions';

const teacherMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        

        default: break;
    }
};

export default teacherMiddleware;