import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));
export default function Home(props){
    const classes = useStyles();

    return(
        <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
            <Typography variant="h6" className={classes.title}>College++</Typography>
            <Button color="inherit" component="a" {...{href:'/dashboard'}}>Dashboard</Button>
            <Button color ="inherit" component="a" {...{href:'/about'}} >About</Button>
            <Button color="inherit" component="a" {...{href:'/login'}}> Login </Button>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        
      </React.Fragment>
        
    );
};