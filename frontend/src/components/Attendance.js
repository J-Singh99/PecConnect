import React from 'react';
import Card from './Card/Card';
import CardHeader from './Card/CardHeader';
import CardBody from './Card/CardBody';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
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
    const classes = useStyles();
    const d = [
      { name: "Attended", y: 3500/40 },
      { name: "Missed", y: 500/40 },
    ];
    const options = {
      backgroundColor:null,
      animationEnabled: true,
      height:200,
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: d
			}]
		}
    return(
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader>
              <CanvasJSChart options = {options}/>
              </CardHeader>
              <CardBody>
                <h2 className={classes.cardTitle}>Machine Learning</h2>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader>
              <CanvasJSChart options = {options}/>
              </CardHeader>
              <CardBody>
              <h2 className={classes.cardTitle}>Database Management Systems</h2>
              </CardBody>
            </Card>
          </Grid>
        </Grid> 
      </div> 
    );
}