import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getGrades} from '../actions/grades';
import {getSgpa} from '../actions/sgpa';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography  from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CanvasJSReact from '../assets/canvasjs.react';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const getTable = (grades) =>{
    if(grades==null){
        return(<div></div>);
    }
    grades = grades['Course and Their Grades'];
    return grades.map(obj =>{
        return (
            <TableRow key ={obj.uid.course.code}>
                <TableCell>{obj.uid.course.name}</TableCell>
                <TableCell>{obj.current_grade}</TableCell>
            </TableRow>
        );
    });
}
function Chart({sgpa}){
    if(sgpa === null){
        return(<div></div>);
    }
    var data = sgpa.map(obj=>{
        return {
            label: `Semester ${obj.semester}`,
            y:parseFloat(obj.sgpa)
        };
    });
    const options = {
        title: {
            text: "Previous Semester SGPA",
        },
        dataPointWidth:20,
        data: [
            {
                type: "column",
                dataPoints:data,
            }
        ]
    }
    return(
        <CanvasJSChart options = {options}/>
    );
}

class Grades extends React.Component {
    static propTypes = {
        grades: PropTypes.object.isRequired,
        sgpa:PropTypes.array.isRequired,
    }
    componentDidMount() {
        this.props.getGrades();
        this.props.getSgpa();
    }

    render(){
        const data = this.props.grades;
        // const classes = this.props.classes;
        return(
            // <Paper className={classes.paper}>
            //     {JSON.stringify(this.props.grades, undefined, 4)}
            // </Paper>
            <Box>
                
                
                    <Chart sgpa ={this.props.sgpa}/>
                <div style = {{padding:"100px", width:"100%"}}>
                    <Typography variant="h4">Semester-wise Grades</Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            Semester 4
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TableContainer>
                                <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course Name</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getTable(data)}
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div >
            </Box>
        );
    }
    
}

const mapStateToProps = state=>({
    grades: state.grades.grades_data,
    sgpa: state.sgpa.sgpa_data,
  });
  
export default connect(mapStateToProps,{getGrades, getSgpa})(Grades);