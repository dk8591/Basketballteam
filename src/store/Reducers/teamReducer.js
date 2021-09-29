import { Team } from '../Actions/team';

const initialstate = {
  teamData: [],
};

const PositionReducer = (state = initialstate, action) => {
  switch (action.type) {
    case Team: {
       return {
        ...state,
        teamData: [action.payload],
      };
    }

    default:
      return state;
  }
};
export default PositionReducer;
