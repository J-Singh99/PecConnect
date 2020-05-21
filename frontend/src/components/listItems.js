import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import TableChartIcon from '@material-ui/icons/TableChart';
import LayersIcon from '@material-ui/icons/Layers';
import GradeIcon from '@material-ui/icons/Grade';


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
        <DonutLargeIcon />
      </ListItemIcon>
      <ListItemText primary="Attendance" />
     </ListItem> 
    <ListItem button  component="a" {...{href:'/grades'}} >
      
      
        <ListItemIcon>
          <GradeIcon/>
        </ListItemIcon>
        <ListItemText primary="Grades" />
    </ListItem>

    <ListItem button  component="a" {...{href:'/timetable'}} >
      <ListItemIcon>
        <TableChartIcon/>
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

