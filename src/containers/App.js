import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customTheme from '../styles/customTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Loading from '../components/Loading';
import AppBar from 'material-ui/AppBar';

import {
	fetchLocationData
} from '../actions/actions';

/* 
	Root Component
	Children component are only rendered
	once cities and countries have been loaded
	from local storage.
*/
class App extends Component {

	componentWillMount() {
		const {
			fetchLocationData
		} = this.props;

		fetchLocationData();
	}

	render() {
		const {
			loading,
			children
		} = this.props;

		return (
			<MuiThemeProvider  muiTheme={getMuiTheme(customTheme)}>
			 <div>
			 	<AppBar title="Weather App"
			 showMenuIconButton={false}
			 className="center"/>
				<Loading
				condition={loading}>
					{children}
				</Loading>
				</div>
    	</MuiThemeProvider>
  	);
	}
}

function mapStateToProps({cities}) {
  return {
  	loading: cities.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
  	fetchLocationData: () => dispatch(fetchLocationData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);
