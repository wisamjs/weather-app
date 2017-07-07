import React, { Component } from 'react';
import { connect } from 'react-redux';
import {detailedForecastConnector} from '../../selectors/detailedForecast';
import {fetchDetailedForecast} from '../../actions/actions';
import Loading from '../../components/Loading';
import TempChart from '../TempChart/TempChart';
import WindChart from '../WindChart/WindChart';

const TEMP_FORECAST_STYLES = {
	width: '30%',
	margin: '10%'
}
const mapStatetoProps = (state, routing) =>  detailedForecastConnector({state,routing});

function mapDispatchToProps(dispatch) {
	return {
		fetchDetailedForecast: (location) => dispatch(fetchDetailedForecast(location))
	}
}

/*
	The detailed forecast component will 
	show the detailed forecast for one location
	based off of the route parameter provided.

	The detailed forecast data is displayed via
	two charts.

*/
class DetailedForecast extends Component {

	componentWillMount() {
		const {
			location,
			fetchDetailedForecast
		} = this.props;
		fetchDetailedForecast(location);

	}
	render(){
		const {
			loading,
			location,
			forecastTemperatures,
			avgWindSpeeds
		} = this.props;

		return (

			<Loading
			condition={loading}>

<p className="h1 center red">{location.city}, {location.country}</p>
					<div className="flex">
					<TempChart
					style={TEMP_FORECAST_STYLES}
					data={forecastTemperatures}/>
					<WindChart
					style={TEMP_FORECAST_STYLES}
					data={avgWindSpeeds}/>
					</div>
			</Loading>


			)
	}
};


export default connect(
	mapStatetoProps,
	mapDispatchToProps
)(DetailedForecast);

