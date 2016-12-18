import Header from './Header';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import agent from '../agent';


const mapStateToProps = state => ({
  appName: state.common.appName,
	currentUser: state.common.currentUser,
	redirectTo: state.common.redirectTo
});


const mapDispatchToProps = dispatch => ({
	onLoad: (payload, token) =>
	  dispatch({ type: 'APP_LOAD', payload, token}),
	onRedirect: () =>
	  dispatch({type : 'REDIRECT' })
});


class App extends React.Component {
	
	componentWillMount() {
		const token = window.localStorage.getItem('jwt');
		if (token) {
			agent.setToken(token);
		}
		
		this.props.onLoad( token ? agent.Auth.current() : null, token);
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.redirectTo) { //if redirect is not null
			this.context.router.replace(nextProps.redirectTo);
			this.props.onRedirect();  //will set redirect to null in reducer
		}
	}
  render() {
    return (
      <div>
        <Header 
					currentUser={this.props.currentUser}
					appName={this.props.appName} 
        />
       
        {this.props.children}
      
      </div>
    );
  }
}

App.contextTypes = {
	router: PropTypes.object.isRequired
};

//App.propTypes = {
//	onLoad: PropTypes.function.isRequired,
//	currentUser: PropTypes.string.isRequired,
//	appName: PropTypes.string.isRequired,
//	onRedirect: PropTypes.function.isRequired,
//	children: PropTypes.object.isRequired
//};


export default connect(mapStateToProps, mapDispatchToProps)(App);


//alternate way
//function mapStateToProps(state) {
//	return {
//		appName: state.appName
//	};
//}