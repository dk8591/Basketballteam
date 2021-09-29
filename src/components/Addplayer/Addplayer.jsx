import React, { useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button,ListItem, ListItemAvatar, ListItemText, Snackbar, Grid,TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import { positionsData } from '../../store/Actions/positions';
import { playersData } from '../../store/Actions/players';
import { styles } from './styles';


function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
const Addplayer = () => {
  const classes = styles();
  const dispatch = useDispatch();
  dispatch(positionsData());

  const positionDataArr = useSelector(
    (state) => state.PositionReducer.positionData
  );
  const playersDataArr = useSelector(
    (state) => state.PlayersReducer.playersData
  );

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState('');
  const [heightError, setHeightError] = useState('');
  const [position, setPosition] = useState([]);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const formRef = useRef();

  const selectPositon = (_, selectedOptions) => {
    setPosition(selectedOptions);
  };

  const addPlayerInfo = (e) => {
    e.preventDefault();
    if (validated) {
      const findName = (item) =>
        item.firstName === firstName && item.lastName === lastName;

      switch (true) {
        case playersDataArr.some(findName): {
          setError('Player Name Already Exist. Try Again');
          break;
        }

        default:
          const params = {
            firstName,
            lastName,
            height,
            position,
          };
          
          setError('');
          setValidated(true);
          dispatch(playersData(params));
          setOpenToast(!openToast);
          setFirstName('');
          setLastName('');
          setPosition([]);
          setHeight('');
          
      }
    }
  };

  const closeToast = () => {
    setOpenToast(!openToast);
  };

  return (
    <Grid container>
    <Grid item xs={12} sm={12} md={8} lg={7}>
      <form
        className={classes.root}
        autoComplete='off'
        onSubmit={addPlayerInfo}
        ref={formRef}
      >
        <TextField
          id='firstName'
          label='FirstName'
          name='firstName'
          value={firstName}
          autoFocus
         style={{ width: '100%', marginBottom: '15px' }}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          id='lastName'
          label='Last Name'
          name='lastName'
          value={lastName}
          style={{ width: '100%', marginBottom: '15px' }}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <TextField
          id='height'
          label='Height'
          name='height'
          required
          value={height}
          error={heightError.length > 0}
         style={{ width: '100%', marginBottom: '15px' }}
          onChange={(e) => {
            const regExp = /^\d+$/;
            const value = e.target.value;
            if (regExp.test(value)) {
              setHeight(value);
              setValidated(true);
              setHeightError('');
            } else {
              setHeightError('Height Must be in Number');
              setValidated(false);
            }
          }}
          helperText={heightError}

        />

        <Autocomplete
          multiple
          filterSelectedOptions
          name='position'
          value={position}
          options={positionDataArr}
          getOptionLabel={(option) => (option.position ? option.position : '')}
          onChange={selectPositon}
          size='small'
          renderInput={(params) => (
            <TextField
              {...params}
              required={position.length === 0}
              label='Position'
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.submitButton}
        >
          Add
        </Button>
        <div style={{ color: 'red', marginTop: '15px' }}>{error}</div>
      </form>
      
      </Grid>      
      <Grid item xs={12} sm={12} md={4} lg={5} style={{minHeight:'150px', maxHeight:'300px', overflow:'auto' }}>
        <>
          <>
            {playersDataArr.map((i)=>
            <ListItem alignItems='flex-start'>
            <ListItemAvatar>
            <Avatar alt={i.firstName[0]?i.firstName[0]:''} src='' />
           </ListItemAvatar>
            <ListItemText style={{marginTop: '15px' }}>{i.firstName} {i.lastName}</ListItemText>
           </ListItem> 
           )}
          </>
        </>
      </Grid>
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
          Player Created Successfully...
        </Alert>
      </Snackbar>
    </Grid>
    
  );
};
export default Addplayer;

