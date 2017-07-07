import { fork } from 'redux-saga/effects';

import { localStorageSaga } from './localStorage/';
import { weatherSaga } from './weather/';
import { browserSaga } from './browser/';

function* rootSaga() {
  yield [
    fork(localStorageSaga),
    fork(weatherSaga),
    fork(browserSaga)
  ];
};

export default rootSaga;