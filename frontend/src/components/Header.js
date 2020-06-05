import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';
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
const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  });
class Header extends React.Component{
  static propTypes= {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  }
  render() {
    const { classes } = this.props;
    const {isAuthenticated, user}= this.props.auth;
    const guestLinks = (
      <>
      <Button color="inherit" component="a" {...{href:'/loginclient'}}> Login </Button>
      <Button color="inherit" component="a" {...{href:'/signup'}}> Sign Up </Button>
      </>
    );

    const authLinks = (
      <Button color="inherit" onClick={this.props.logout}> Logout</Button>
    );
    return(
      <React.Fragment>
        <CssBaseline />
        <ElevationScroll {...this.props}>
          <AppBar>
            <Toolbar>
            <Typography variant="h6" className={classes.title}>College++</Typography>
            <Button color="inherit" component="a" {...{href:'/dashboard'}}>Dashboard</Button>
            <Button color ="inherit" component="a" {...{href:'/about'}} >About</Button>
            {isAuthenticated? authLinks:guestLinks}
            </Toolbar>
          </AppBar>
        </ElevationScroll>
      </React.Fragment>
      
    );

  }
    
};

const mapStateToProps = state =>({
  auth: state.auth,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps,{logout})
)(Header);


