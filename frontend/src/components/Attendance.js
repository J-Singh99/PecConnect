import React from 'react';
import Card from './Card/Card';
import CardHeader from './Card/CardHeader';
import CardBody from './Card/CardBody';
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';
import CanvasJSReact from '../assets/canvasjs.react';
import PropTypes from 'prop-types';
import {getAttendance} from '../actions/attendance';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("custom",
  ['green', 'red']
)
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
const useStyles = (theme)=>(styles);

const getCards = (attendance,classes)=>{
  if (attendance==null){
    return(<div></div>);
  }
  return attendance['Course and Their Attendances'].map(obj=>{
    let total = obj['attended']+obj['missed'];
    const d = [
      { name: "Attended", y: obj['attended']/total*100 },
      { name: "Missed", y: obj['missed']/total*100 },
    ];
    const options = {
      colorSet: 'custom',
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
    return (
      <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader>
            <CanvasJSChart options = {options}/>
            </CardHeader>
            <CardBody>
              <h2 className={classes.cardTitle}>{obj.uid.course.name}</h2>
              <p>Attended:{obj['attended']} | Missed:{obj.missed}</p>
            </CardBody>
          </Card>
      </Grid>
    );
  });
}

class Attendance extends React.Component {
  static propTypes = {
    attendance: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.getAttendance();
  }
  render() {
    const classes = this.props.classes;
    return(
      <div>
        <Grid container spacing={3}>
          {getCards(this.props.attendance, classes)}
        </Grid> 
      </div> 
    );

  }
    
}

const mapStateToProps = state=>({
  attendance: state.attendance.attendance_data,
});

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps,{getAttendance})
)(Attendance);