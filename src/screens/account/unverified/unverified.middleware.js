import {

} from './unverified.actions';

const unverifiedMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        

        default: break;
    }
};

export default unverifiedMiddleware;