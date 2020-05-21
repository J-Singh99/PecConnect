import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Grades(props) {
    const {classes} = props;

    return(
        <Paper className={classes.paper}>
            <h1>You have shitty Grades!</h1>
        </Paper>
    );
}