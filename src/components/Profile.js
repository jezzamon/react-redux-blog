import ArticleList from './Home/ArticleList';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});  //this state will be exported to ProfileFavorites

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: 'FOLLOW_USER',
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: 'PROFILE_PAGE_LOADED', payload }),
	onSetPage: (page, payload) => dispatch({ type: 'SET_PAGE', page, payload }),
  onUnfollow: username => dispatch({
    type: 'UNFOLLOW_USER',
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: 'PROFILE_PAGE_UNLOADED' })
});

//Helper Components
const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"/> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

//eslint-disable-next-line
const FollowUserButton = props => {
	if (!props.user) {
		return null;
	}
	
	let classes = 'btn btn-sm action-btn';
	if (props.user.following) {
		classes += ' btn-secondary';
		
	} else {
		classes += ' btn-outline-secondary';
	}
	
	const handleClick = ev => {
		ev.preventDefault();
		if (props.user.following) {
			props.unfollow(props.user.username);
		} else {
			props.follow(props.user.username);
		}
	};
	
	return (
		<button
			style={{color: 'white'}}
		  className={classes}
		  onClick={handleClick}>
		  <i className="ion-plus-round"/>
		  &nbsp;
		  {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
		</button>
	);
};


//eslint-disable-next-line
class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Articles.byAuthor(this.props.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
	
	

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
	
	onSetPage(page) {
    const promise = agent.Articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
  }

  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.username === this.props.currentUser.username;

		const onSetPage = page => this.onSetPage(page);
		
    return (
			<div className="profile-page">
			<div className="page-header header-filter" data-parallax="active"></div>
      <div className="profile-page main main-raised">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                  />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                articles={this.props.articles} 
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                onSetPage={onSetPage}/>
            </div>

          </div>
        </div>

      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile as Profile, mapStateToProps as mapStateToProps }; 
//will export so we can use Profiles functions (renderTab)in another component and just the styling from Profile