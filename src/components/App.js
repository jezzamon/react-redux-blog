import Header from './Header';
import Home from './Home/Home';
import React from 'react';
import { connect } from 'react-redux';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.appName
});

export default connect(mapStateToProps, () => ({}))(App);


//alternate way
//function mapStateToProps(state) {
//	return {
//		appName: state.appName
//	};
//}