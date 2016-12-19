import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import articleList from './reducers/articleList';


const reducer = combineReducers({
	article,
	articleList,
	auth,
	common,
	home,
	settings
	});

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

export default store;