import React from 'react';
import Card from './Card/Card';
import CardHeader from './Card/CardHeader';
import CardBody from './Card/CardBody';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
var styles = {
    cardTitle: {
        marginTop: "0",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};
const useStyles = makeStyles(styles);
export default function Attendance(props) {
    const classes = useStyles(); ;
    return(
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader color="danger">
                <h4 className={classes.cardTitle}>Machine Learning</h4>
                <p>62%</p>
              </CardHeader>
              <CardBody>
              Total: bla | Attended: 0 | Missed: 0
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitle}>Database Management Systems</h4>
                <p>75%</p>
              </CardHeader>
              <CardBody>
               Total: bla | Attended: 0 | Missed: 0
              </CardBody>
            </Card>
          </Grid>
        </Grid> 
      </div> 
    );
}