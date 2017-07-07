import React, {PropTypes} from 'react';
import SimpleChart from '../../components/SimpleChart';
import Paper from 'material-ui/Paper';

const DEFAULT_STYLE = {
  backgroundColor: '#FFF'
  // margin: '16rem'
}

const barData = [
  {
    dataKey: 'high', 
    fill: '#F6C690',
    stackId: 'a'
  }, 
  {
    dataKey: 'low', 
    fill: '#72C8ED',
    stackId: 'a'
  }
];

/*
  Temp Chart component that utilisizes the SimpleChart
  component to display temperatures
*/
const TempChart = ({data,style={DEFAULT_STYLE}}) => {

  return (
<Paper style={style}
zDepth={3}>
    <p className="h3 center">Temperatures</p>
   <SimpleChart
   data={data}
   width='100%'
   xDataKey="weekday"
   barData={barData}/>
   </Paper>
  );
}

TempChart.defaultName = 'TempChart';
TempChart.propTypes = {
  style: PropTypes.object,
  data : PropTypes.array,
}

export default TempChart;