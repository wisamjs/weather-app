import React, {PropTypes} from 'react';
import SimpleChart from '../../components/SimpleChart';
import Paper from 'material-ui/Paper';

const DEFAULT_STYLE = {
  backgroundColor: '#FFF'
}

const barData = [
  {
    dataKey: 'wind', 
    fill: '#508A57',
    stackId: 'a'
  }
];

/*
  Wind Chart component that utilisizes the SimpleChart
  component to display average wind speed
*/
const WindChart = ({data,style={DEFAULT_STYLE}}) => {

  return (
<Paper style={style}
zDepth={3}>
    <p className="h3 center">Average Wind</p>
   <SimpleChart
   data={data}
   width='100%'
   xDataKey="weekday"
   barData={barData}/>
   </Paper>
  );
}

WindChart.defaultName = 'TempChart';
WindChart.propTypes = {
  style: PropTypes.object,
  data : PropTypes.array,
}

export default WindChart;