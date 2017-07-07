import React, {PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const DEFAULT_STYLE = {
	margin: '16rem'
}

// UI Component that displays a loading spinner
const Spinner = ({style = DEFAULT_STYLE}) => (
  <div className="flex justify-center">
    <CircularProgress
    className=""
    size={80} 
    thickness={5}
    style={style} />
  </div>
);

Spinner.defaultName = 'Spinner';
Spinner.propTypes = {
  style: PropTypes.object,
}

export default Spinner;