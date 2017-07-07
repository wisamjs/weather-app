import R from 'ramda';

export const apiOptions = (method) => 
	() => {
		return {
	 	method: method,
	 	mode: 'cors',
	 	headers: {
	 		'Content-Type': 'application/json',
	 		'Access-Control-Allow-Origin':'*'
	    }
	  }
	}

export const fetchFromApi = R.curry(
	(baseUrl, method, route) => 
		fetch(`${baseUrl}/${route}`,
			apiOptions(method)
	)
);
