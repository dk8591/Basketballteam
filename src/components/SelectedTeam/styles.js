import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%',
    height: '450px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  submitButton: {
    borderRadius: '10px',
    float: 'right',
    width:'auto'
   
  },
}));

export default useStyles;
