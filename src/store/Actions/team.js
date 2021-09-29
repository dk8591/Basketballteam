export const Team = 'Team';

export const TeamData = (params) => async (dispatch) => {
 dispatch({
    type: Team,
    payload: params,
  });
};
