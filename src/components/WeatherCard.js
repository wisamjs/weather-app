import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';

const DEFAULT_CLASSNAME = "p3 m2 white";

const DEFAULT_STYLE = {
	color: '#FFFF'
}
/* 
	Displays a weather card that shows weather information.
	Forecast defaults to Celsius.
*/
const WeatherCard = ({id,city, country, temperature, icon, className, summary, style = DEFAULT_STYLE, onClick}) => (
	<Paper
	zDepth={3}
	style={{...style}}
	onClick={onClick}
	className={DEFAULT_CLASSNAME.concat(` ${className}`)}>
		<p className="h1 center">{city}</p>
		<p className="h2 center">{country}</p>
		<div className="flex items-center">
			<p className="h2 m1">{temperature}&#176;C</p>
			<img className="h2 m1" src={icon} alt="icon"/>
		</div>
			<p className="center">{summary}</p>
	</Paper>
);


WeatherCard.defaultName = 'WeatherCard';
WeatherCard.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default WeatherCard;