import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let token = null;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
	post: (url, body) =>
	  superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const Articles = {
  all: page =>
    requests.get(`/articles?limit=10`),
	get: slug =>
	  requests.get(`/articles/${slug}`)
};

const Comments = {
	forArticle: slug =>
	  requests.get(`/articles/${slug}/comments`)
}

const Auth = {
	current: () =>
	  requests.get('/user'),
	login: (email, password) => 
	  requests.post('/users/login', { user: { email, password} }),
	register: (username, email, password) =>
	  requests.post('/users', { user: { username, email, password } }),
	save: user =>
		requests.put('/user', { user })
};



export default {
  Articles, 
	Auth,
	Comments,
	setToken: _token => { token = _token }
};