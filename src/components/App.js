import Header from './Header';
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  appName: state.common.appName
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        {this.props.children}
      </div>
    );
  }
}

App.contextTypes = {
	router: PropTypes.object.isRequired
};


export default connect(mapStateToProps, () => ({}))(App);


//alternate way
//function mapStateToProps(state) {
//	return {
//		appName: state.appName
//	};
//}