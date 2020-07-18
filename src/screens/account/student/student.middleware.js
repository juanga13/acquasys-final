import {

} from './student.actions';

const studentMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        

        default: break;
    }
};

export default studentMiddleware;