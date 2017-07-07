import React, {PropTypes} from 'react';
import Spinner from './Spinner';

/* Adds a loading spinner if condition is truthy
*/
const Loading = ({condition, children}) => (
	<div>
	{ condition?  <Spinner/> : children}
	</div>
);

Loading.defaultName = 'Loading';
Loading.propTypes = {
	style: PropTypes.object,
	condition: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
}

export default Loading;