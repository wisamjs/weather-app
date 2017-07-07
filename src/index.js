import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin';
import R from 'ramda';

import App from './containers/App';
import Dashboard from './containers/Dashboard/dashboard';
import DetailedForecast from './containers/DetailedForecast/DetailedForecast';


import './styles/index.css';
import configureStore from './store/';

//Debugging
window.R = R;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
	  <Provider store={store}>
	   <Router history={history}>
	      <Route path="/" component={App}>
	        <IndexRedirect to='dashboard'/>
	        <Route path="dashboard" component={Dashboard}/>
	        <Route path="forecast/:id" component={DetailedForecast}/>
	      </Route>
	    </Router>
	  </Provider>,
	  document.getElementById('root')
);
