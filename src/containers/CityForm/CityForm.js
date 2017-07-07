import React, { Component } from 'react';
import SimpleForm from '../../components/SimpleForm';

const ERROR_WRONG_FORMAT = `Location must be in format "city , country".`;

/*
  A City form component that has it's own internal state.
  The state is used for validation. The reason for using internal
  state over redux state was that this state didnt feel important
  enough to add to redux. 

  If there was a desire to say, have a 
  record of what cities the user tried adding, that would be 
  reason enough to use redux state.
*/
class CityForm extends Component {

  constructor() {
    super();
    this.state = {
    	input: ''
    }
  }

  //Use internal state to handle input and validation
  updateInput(e, newVal) {
    this.setState({input: newVal});
  }

  handleClick() {
  /*  Only call the provided onClick function
      when the text has passed validation
  */
  	const locations = this.state.input.split(',');

  	if (locations.length === 2) {
  		
  		const location = {
  			city: locations[0],
  			country: locations[1]
  		}

  		this.setState({...this.state, errorText: ''});
  		this.props.onClick(location);
  	} else {
  		this.setState({...this.state, errorText:ERROR_WRONG_FORMAT});
  	}
  }


	render() {
		return (
			<SimpleForm
			label="Add City"
			hintText="Paris, France"
			value={this.state.input}
			errorText={this.state.errorText}
			onChange={(e, newVal) => this.updateInput(e, newVal)}
			onClick={() => this.handleClick()}
			/>
  	);
	}
}

export default CityForm;
