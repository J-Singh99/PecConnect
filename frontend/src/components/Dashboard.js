import React from 'react';
import Paper from '@material-ui/core/Paper';

export default function Dashboard(props) {
    const {classes} = props;

    return(
        <Paper className={classes.paper}>
            <h1>Welcome</h1>
            <h2>Your life sucks!</h2>
        </Paper>
    );
}