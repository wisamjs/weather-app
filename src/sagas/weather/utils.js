import R from 'ramda';

const hasLocation = R.has('location');
const hasResponse = R.has('response');
const hasResults = R.path(['response', 'results']);

export const head = R.head();
export const foundMatch = (location) => hasLocation(location);
export const foundPotentialMatches = (location) => 
  hasResponse(location) && hasResults(location);

  

