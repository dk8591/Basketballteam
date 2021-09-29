import React from 'react';
import {AppBar, Tabs, Tab, Typography, Box, Grid} from '@material-ui/core';
import Addplayer from '../Addplayer/Addplayer';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import styles from './styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{maxHeight:'75%', minHeight:'75%', overflow:'auto'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function tabs(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  const classes = styles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <div className={classes.root}>
          <div className={classes.root}>
            <AppBar position='static'>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='Team'
                style={{ background: '#4E7BC3' }}
                className={classes.tabheader}
                scrollButtons='auto'
                TabIndicatorProps={{ style: { background: '#fff' } }}
              >
                <Tab label='Compose Team' {...tabs(0)} />
                <Tab label='First Quarter' {...tabs(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Addplayer />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SelectedTeam />
            </TabPanel>
          </div>
        </div>
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
    </Grid>
  );
}
