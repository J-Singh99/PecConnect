import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';



export const mainListItems = (
  <div>
    <ListItem button component="a" {...{href:'/dashboard'}} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button  component="a" {...{href:'/attendance'}} >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
     </ListItem> 
    <ListItem button  component="a" {...{href:'/grades'}} >
      
      
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Grades" />
    </ListItem>

    <ListItem button  component="a" {...{href:'/timetable'}} >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
        <ListItemText primary="Time Table" />
    </ListItem>
    <ListItem button component="a" {...{href:'/dashboard'}} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Whatever" />
    </ListItem>
  </div>
);

