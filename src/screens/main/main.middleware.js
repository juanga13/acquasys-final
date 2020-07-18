

const mainMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
       

        default: break;
    }
};

export default mainMiddleware;