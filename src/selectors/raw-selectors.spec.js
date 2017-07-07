import expect from 'expect';
import * as selectors from './raw-selectors';

describe('Raw Selectors', () => {
	describe(`getExactLocation`, () => {

  	it(`should return obj with id, city and country`, () => {
  		const countries = {
				0: {
					id: 0,
					name: 'Canada'
				},
				1: {
					id: 1,
					name: 'France'
				}
  		}

  		const city = {
  			id: 2,
  			countryId: 1,
  			name: 'Paris'
  		}

    	const result = selectors.getExactLocation(countries, city);
    	expect(result).toInclude({
    		id: 2,
    		city: 'Paris',
    		country: 'France'
    	});
  });

  })

  describe(`getHighsAndLows`, () => {
  	it('should get high and low temps', () => {
  		const forecastsById = {
  			0: {
  				id: 0,
  				detailedForecast:[
  					{
							high: {
								celsius: 23
							},
							low: {
								celsius: 15
							},
							date: {
								day: 'Monday',
								weekday_short: 'Mon'
							}
  					},
  					{
							high: {
								celsius: 20
							},
							low: {
								celsius: 18
							},
							date: {
								day: 'Tuesday',
								weekday_short: 'Tue'
							}
  					}],
  				}
  			}

  				const result = selectors.getHighsAndLows(forecastsById);
  				const firstResult = result[0];
  				const secondResult = result[1];
  				expect(result).toBeAn('array');
  				expect(result.length).toBe(2);
  				
  				expect(firstResult).toInclude({
  					'high': 23,
  					low: 15,
  					weekday: 'Mon'
  				})

  				expect(secondResult).toInclude({
  					'high': 20,
  					low: 18,
  					weekday: 'Tue'
  				})

  		})
  	});



});