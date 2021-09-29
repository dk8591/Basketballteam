import React,{ useState } from 'react';
import {  Button,  FormControl,  FormHelperText,  InputLabel,  MenuItem,  Select,  Snackbar,} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { TeamData } from '../../store/Actions/team';
import styles from './styles';


const Quarter = () => {
  const classes = styles();
  const dispatch = useDispatch();

  const positionDataArr = useSelector(
    (state) => state.PositionReducer.positionData
  );
  const playersDataArr = useSelector(
    (state) => state.PlayersReducer.playersData
  );
  const [openToast, setOpenToast] = useState(false);

  const [teamDataArr, setTeamDataArr] = useState([
    { id: 1, player: '', position: '', playerError: '', positionError: '' },
    { id: 2, player: '', position: '', playerError: '', positionError: '' },
    { id: 3, player: '', position: '', playerError: '', positionError: '' },
    { id: 4, player: '', position: '', playerError: '', positionError: '' },
    { id: 5, player: '', position: '', playerError: '', positionError: '' },
  ]);

  const onChange = (e, index) => {
    let newArr = [...teamDataArr];
    const findCurrentName = (item) => item.player === e.target.value;
    const findPosition = (item) => item.position === e.target.value;
    let playerPosition = false;

    for (var i = 0; i < playersDataArr.length; i++) {
      const name =
        playersDataArr[i].firstName + ' ' + playersDataArr[i].lastName;
      const selectedPlayerName =
        e.target.name === 'player' ? e.target.value : newArr[index].player;

      if (name === selectedPlayerName) {
        for (var j = 0; j < playersDataArr[i].position.length; j++) {
          if (e.target.name === 'position') {
            if (playersDataArr[i].position[j].position === e.target.value) {
              playerPosition = true;
              break;
            } else {
              playerPosition = false;
            }
          } else {
            if (
              playersDataArr[i].position[j].position === newArr[index].position
            ) {
              playerPosition = true;
              break;
            } else {
              if (newArr[index].position === '') {
                playerPosition = true;
              } else {
                playerPosition = false;
              }
            }
          }
        }
      }
    }

    switch (true) {
      case teamDataArr.some(findCurrentName): {
        newArr[index].playerError = 'Player Already Selected';
        newArr[index][e.target.name] = e.target.value;
        setTeamDataArr(newArr);
        break;
      }

      case teamDataArr.some(findPosition): {
        newArr[index].positionError = 'Position Already Selected';
        newArr[index][e.target.name] = e.target.value;
        setTeamDataArr(newArr);
        break;
      }

      case !playerPosition: {
        if (newArr[index].player === '') {
          newArr[index].positionError =
            'Please select player to assign position';
          newArr[index].playerError = '';
          newArr[index][e.target.name] = e.target.value;
        } else {
          newArr[index].positionError = 'Player not selected for this position';
          newArr[index].playerError = '';
          newArr[index][e.target.name] = e.target.value;
        }
        setTeamDataArr(newArr);
        break;
      }

      default:
        newArr[index].playerError = '';
        newArr[index].positionError = '';
        newArr[index][e.target.name] = e.target.value;
        setTeamDataArr(newArr);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const hasNoError = teamDataArr.map(
      (item) => item.positionError.length > 0 || item.playerError.length > 0
    );

    if (!hasNoError.includes(true)) {
      setOpenToast(!openToast);
      dispatch(TeamData(teamDataArr));
    }
  };

  const closeToast = () => {
    setOpenToast(!openToast);
  };

  return (
    <div style={{maxHeight:'75%', minHeight:'50%'}}>
      <form className={classes.root} onSubmit={submit} autoComplete='off'>
        {teamDataArr.map((item, index) => (
          <div className='flex' key={index}>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>
                Player {index + 1} *
              </InputLabel>
              <Select
                labelId='player'
                id='player'
                required
                value={item.player}
                name={'player'}
                error={item.playerError.length > 0 ? true : false}
                style={{ width: '75%', marginBottom: '15px' }}
                onChange={(e) => onChange(e, index)}
              >
                {playersDataArr.length > 0
                  ? playersDataArr.map((player, playerIndex) => (
                      <MenuItem
                        value={player.firstName + ' ' + player.lastName}
                        key={playerIndex}
                      >
                        {player.firstName + ' ' + player.lastName}
                      </MenuItem>
                    ))
                  : null}
              </Select>
              {item.playerError.length > 0 ? (
                <FormHelperText style={{ color: 'red' }}>
                  {item.playerError}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>Postion *</InputLabel>
              <Select
                labelId='Postion'
                id='postion'
                value={item.position}
                name='position'
                required
                error={item.positionError.length > 0 ? true : false}
                style={{ width: '75%', marginBottom: '15px' }}
                onChange={(e) => onChange(e, index)}
              >
                {positionDataArr.map((positionItem, positionIndex) => (
                  <MenuItem value={positionItem.position} key={positionIndex}>
                    {positionItem.position}
                  </MenuItem>
                ))}
              </Select>
              {item.positionError.length > 0 ? (
                <FormHelperText style={{ color: 'red' }}>
                  {item.positionError}
                </FormHelperText>
              ) : null}
            </FormControl>
          </div>
        ))}
<div style={{width:'35%'}}>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.submitButton}
        >
          Select Team
        </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openToast}
        autoHideDuration={3000}
        onClose={closeToast}
      >
        <Alert onClose={closeToast} severity='success'>
          Team Created Successfully..
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Quarter;

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
