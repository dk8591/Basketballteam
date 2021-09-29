import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import PositionReducer from '../store/Reducers/positionReducer';
import PlayersReducer from '../store/Reducers/playersReducer';
import TeamReducer from '../store/Reducers/teamReducer';

const rootReducer = combineReducers({
  PositionReducer,
  PlayersReducer,
  TeamReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)
);
export default store;
