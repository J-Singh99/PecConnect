import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Timetable(props) {
    const {classes} = props;

    return(
        <Paper className={classes.paper}>
            <h1>You have a shitty Timetable!</h1>
        </Paper>
    );
}