import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: '75px',
  }, 
  tabheader: {
    background:'#4E7BC3',    
    '&.MuiTab-textColorInherit.Mui-selected': {
      backgroundColor:'#fff',   
    border: '1px solid',
    borderTopRightRadius: '0 12px 0 0',
    color:'#4E7BC3'

    }
  }, 
  
}));

export default useStyles;
