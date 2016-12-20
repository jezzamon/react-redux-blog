import agent from './agent';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type});
		action.payload.then(
      res => {
				console.log("middleware response",res)
        action.payload = res;
        store.dispatch(action);
      },
      error => {
				console.log("middleware response error", error.response.body);
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function'; //helper to check if paramater passed is function 
}

const localStorageMiddleware = store => next => action => {
	if (action.type === 'REGISTER' || action.type === 'LOGIN') {
		if (!action.error) {
			window.localStorage.setItem('jwt', action.payload.user.token);
			agent.setToken(action.payload.user.token);
			console.log("set token", action.payload.user.token);
		}
	} else if (action.type === 'LOGOUT') {
		window.localStoreage.setItem('jwt', '');
		agent.setToken(null);
	}
	
	next(action);
};


export {
  localStorageMiddleware,
	promiseMiddleware
};