import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Schedule from './schedule';
import  {appointmentsC}  from './demo-data/appointments';
import  {appointmentsP}  from './demo-data/appointmentsP';
import  {appointmentsF}  from './demo-data/appointmentsF';
import  {appointmentsM}  from './demo-data/appointmentsM';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
           
        >
          <LinkTab label="CLASES" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="PARCIAL" href="/trash" {...a11yProps(1)} />
          <LinkTab label="FINAL" href="/spam" {...a11yProps(2)} />
          <LinkTab label="MEJORAMIENTO" href="/spam" {...a11yProps(3)} />
        </Tabs>
      </AppBar>


      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <Schedule appointments={appointmentsC}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          < Schedule appointments={appointmentsP} />
        </TabPanel>

        <TabPanel value={value} index={2}>
          < Schedule appointments={appointmentsF} />
        </TabPanel>

        <TabPanel value={value} index={3}>
          < Schedule appointments={appointmentsM}  />
        </TabPanel>

      </SwipeableViews>

      
    </div>
  );
}
