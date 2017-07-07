import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as saga from './index';
import { ON_FETCH_CITIES_SUCCESS, ON_FETCH_COUNTRIES_SUCCESS } from '../../actions/consts';
import { 
  fetchCities, 
  fetchDefaultCities,
  fetchCountries,
  fetchDefaultCountries
} from '../../api/localStorage';

// it('Saga - simpleSideEffect - delays for 1 ms', () => {
//   const generator = simpleSideEffect();

//   expect(generator.next().value)
//     .toEqual(call(delay, 1));
  
//   expect(generator.next())
//     .toEqual({ done: true, value: undefined });
// });

describe(`getCities`, () => {

  it ('gets cities, and dispatches success action', () => {
    const generator = saga.getCities();

    const cities = {
      0 : {
        id: 0,
        name: 'Ottawa',
        countryId: 1
      }
    }

    expect(generator.next().value)
      .toEqual(call(fetchCities));

    expect(generator.next(cities).value)
      .toEqual(put({ type: ON_FETCH_CITIES_SUCCESS, payload: cities}));
  });

  it (`gets cities, and if blank, 
    gets default cities and dispatches success action`, () => {
    const generator = saga.getCities();

    const cities = {
      0 : {
        id: 0,
        name: 'Ottawa',
        countryId: 1
      }
    }

    expect(generator.next().value)
      .toEqual(call(fetchCities));

    expect(generator.next().value)
      .toEqual(call(fetchDefaultCities));

    expect(generator.next(cities).value)
      .toEqual(put({ type: ON_FETCH_CITIES_SUCCESS, payload: cities}));
  });
});

describe(`getCountries`, () => {

  it ('gets countries, and dispatches success action', () => {
    const generator = saga.getCountries();

    const countries = {
      0 : {
        id: 0,
        name: 'Ottawa',
        countryId: 1
      }
    }

    expect(generator.next().value)
      .toEqual(call(fetchCountries));

    expect(generator.next(countries).value)
      .toEqual(put({ type: ON_FETCH_COUNTRIES_SUCCESS, payload: countries}));
  });

  it (`gets countries, and if blank, 
    gets default countries and dispatches success action`, () => {
    const generator = saga.getCountries();

    const countries = {
      0 : {
        id: 0,
        name: 'Ottawa',
        countryId: 1
      }
    }

    expect(generator.next().value)
      .toEqual(call(fetchCountries));

    expect(generator.next().value)
      .toEqual(call(fetchDefaultCountries));

    expect(generator.next(countries).value)
      .toEqual(put({ type: ON_FETCH_COUNTRIES_SUCCESS, payload: countries}));
  });
});







