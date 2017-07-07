import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardConnector } from '../../selectors/dashboard';
import WeatherCard from '../../components/WeatherCard';
import Loading from '../../components/Loading';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import R from 'ramda';

import {
  fetchForecasts,
  addLocation,
  goToDetailedForecastPage,
  removeLocation
} from '../../actions/actions';

import CityForm from '../CityForm/CityForm';


const mapStateToProps = (state, routing) => dashboardConnector({state, routing});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchForecasts: (locations) => dispatch(fetchForecasts(locations)),
    addCity: (input) => dispatch(addLocation(input)),
    removeCity: (location) => dispatch(removeLocation(location)),
    goToDetailedForecastPage: (city) => dispatch(goToDetailedForecastPage(city))
    
  }
}

const STYLE = {
  background: 'rgba(0,0,0,.3)'
}

/* 
 The main Dashboard component
 The component displays forecasts for each location
 and allows the user to add or remove locations
*/
class Dashboard extends Component {

  componentWillMount() {
    const {
      locations,
      fetchForecasts
    } = this.props;

    fetchForecasts(locations)
  }

  render() {
    const  {
      dailyForecasts,
      addCity,
      removeCity,
      locations,
      goToDetailedForecastPage,
      loading
    } = this.props;

    const WeatherCardStyle = {
      color: '#FFF',
      backgroundColor: '#F47D66'
    }

    const FLOATING_ACTION_STYLE = {
      position: 'absolute',
      top: 0,
      right: 0
    }

    const weatherCards = R.map((city)=>{
      return <div key={city.id}
      className="relative">
        <WeatherCard 
        key={city.id}
        city={city.display_location.city}
        country={city.display_location.state_name}
        summary={city.weather}
        icon={city.icon_url}
        style={WeatherCardStyle}
        temperature={city.dewpoint_c}
        onClick={() => goToDetailedForecastPage(city)}/>
          <FloatingActionButton 
          onClick={() => removeCity(locations[city.id])}
          style={FLOATING_ACTION_STYLE}
          secondary={true}>
            <ContentRemove/>
          </FloatingActionButton>
        </div>
    })(dailyForecasts);

    return (
      <div className="relative vh100">
          <div>
              <Loading
              condition={loading}>
              <div className="flex justify-center" style={STYLE}>
                {weatherCards}
              </div>
              </Loading>

            <CityForm
            onClick={addCity}>
            </CityForm>
        </div>
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Dashboard);