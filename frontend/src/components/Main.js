import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import {Switch,Route} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';
import useStyles from '../styles/sidebarstyles';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import Grades from './Grades';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Timetable from './Timetable';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import {logout} from '../actions/auth';
import TAttendance from './TAttendance';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        College++
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



class Main extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      open:false
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user_group: PropTypes.string,
  }
  handleDrawerOpen() {
    this.setState(
      { open:true }
    );
  }
  handleDrawerClose(){
    this.setState(
      { open:false }
    );
  }
  render() {
    if(this.props.isAuthenticated===false){
      return <Redirect
        to='/loginclient'
      />;
    }
    const classes = this.props.classes;
    // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={this.props.logout}> Logout</Button>
            {/* <IconButton color="inherit">
              <Badge badgeContent={8} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <div>
            <ListItem button  component="a" {...{href:'/'}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
              <ListItemText primary="Return to Home" />
            </ListItem>
          </div>
            
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route exact path="/dashboard" component={()=><Dashboard classes = {classes}/>}/>
              <Route exact path="/dashboard/attendance" component={()=>this.props.user_group==='S'?<Attendance classes = {classes}/>:<TAttendance classes={classes}/>}/>
              <Route exact path="/dashboard/grades" component={()=><Grades classes = {classes}/>}/>
              <Route exact path="/dashboard/timetable" component={()=><Timetable classes = {classes}/>}/>
            </Switch>
          </Container>
          <Box pt={5}>
              <Copyright/>
          </Box>

        </main>
      </div>
    );
  }
};
const mapStateToProps = state=>({
  isAuthenticated: state.auth.isAuthenticated,
  user_group: state.auth.user==null?null:state.auth.user.user_group,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps,{logout})
)(Main);