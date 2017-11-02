# redux-sidekick
WIP

Redux is awesome! It helps making state management predictable, testable and
easy to write and we love it. What's even more amazing about it is its
flexibility and the fact that you're not forced to organize your app in a
specific way.

However we sometimes see beginners hqving some difficulties understanding how
to wire asynchronous actions into the redux workflow. Redux sidekick tries to
build an abstraction on top of Redux in order to help you include asynchronous
behaviour into your redux workflow easily.

# HTTP Requests
The first and we think most used asynchronous behaviour is data fetching
through HTTP Requests. Here's how you can use redux-sidekick to help you with
that.

```js
// Use redux-sidekick http middleware and http reducer when you create your
// store
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { httpMiddleware, httpReducer } from 'redux-sidekick';

const store = createStore(
  httpReducer(ACTION),
  /*initialState*/,
  compose(applyMiddleware(httpMiddleware))
);
```

```js
// Wire data fetching in yout containers using redux-sideckick http action
// creator

class Container extends Component {
  render() {
    return ...;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { loading, fetchResult, fetchErrors } = state;
  return { 
    loading,
    fetchResult,
    fetchErrors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: url => {
      dispatch(
        http({
          type: ACTION,
          method: 'get',
          url: 'http://my-api-url.com'
        })
      );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
