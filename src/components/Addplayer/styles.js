import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '300px',
    height: '350px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submitButton: {
    borderRadius: '10px',
    float: 'right',
    marginTop:'20px'
  },
}));

export { styles };
