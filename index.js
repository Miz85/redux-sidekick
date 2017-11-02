import request from 'request-promise-native';
const HTTP = 'REDUX_SIDEKICK/HTTP';

export const http = ({ type = '', method = 'get', url }) => ({
  _type: HTTP,
  type,
  method,
  url
});

export const httpMiddleware = store => next => action => {
  if (action && action.type && action._type === HTTP) {
    store.dispatch({ type: `${action.type}_LOADING` });
    request(action.url)
      .then(data => {
        store.dispatch({
          type: `${action.type}_DONE`,
          value: JSON.parse(data)
        });
      })
      .catch(error => {
        store.dispatch({
          type: `${action.type}_ERROR`,
          value: error
        });
      });
  }

  // If it's not an HTTP action just let it through to the next middleware
  next(action);
};

export const httpReducer = actionType => (state = {}, action) => {
  let newState = state;

  if (action.type.startsWith(actionType)) {
    switch (action.type) {
      case `${actionType}_LOADING`:
        newState = Object.assign({}, state, {
          loading: true,
          fetchResult: null,
          fetchErrors: null
        });
        break;
      case `${actionType}_DONE`:
        newState = Object.assign({}, state, {
          loading: false,
          fetchResult: action.value,
          fetchErrors: null
        });
        break;
      case `${actionType}_ERROR`:
        newState = Object.assign({}, state, {
          loading: false,
          fetchResult: null,
          fetchErrors: action.value
        });
        break;
      default:
        newState = state;
    }
  }

  return newState;
};
