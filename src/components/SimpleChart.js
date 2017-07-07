import React, {PropTypes} from 'react';
import R from 'ramda';

import {
	BarChart,
	Bar,
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend,
	ResponsiveContainer
} from 'recharts';

const DEFAULT_STYLE = {
	padding: '1rem'
};

const SimpleChart = ({data, xDataKey, barData, style=DEFAULT_STYLE}) => {
	const bars = R.map((bar, key) => <Bar key={key} {...bar}/>)(barData);

	return (
		<ResponsiveContainer width='90%' style={style} aspect={0.8}>
    	<BarChart data={data}>
       <XAxis dataKey={xDataKey}/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       {bars}
      </BarChart>
      </ResponsiveContainer>
    );
}

SimpleChart.defaultName = 'SimpleChart';
SimpleChart.propTypes = {
  style: PropTypes.object,
}

export default SimpleChart;