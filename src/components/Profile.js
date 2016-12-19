import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => {(
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile
)};

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
	onLoad: payload => dispatch({type: 'PROFILE_PAGE_LOADED', payload}),
	onUnfollow: username => dispatch({
		type: 'UNFOLLOW_USER',
		payload: agent.Profile.unfollow(username)
	}),
	onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});

