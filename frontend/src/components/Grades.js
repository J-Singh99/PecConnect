import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getGrades} from '../actions/grades';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const getTable = (grades) =>{
    if(grades==null){
        return(<div></div>);
    }
    grades = grades['Course and Their Grades'];
    return grades.map(obj =>{
        return (
            <TableRow>
                <TableCell>{obj.uid.course.name}</TableCell>
                <TableCell>{obj.current_grade}</TableCell>
            </TableRow>
        );
    });
}

class Grades extends React.Component {
    static propTypes = {
        grades: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.getGrades();
    }

    render(){
        const data = this.props.grades;
        // const classes = this.props.classes;
        return(
            // <Paper className={classes.paper}>
            //     {JSON.stringify(this.props.grades, undefined, 4)}
            // </Paper>
            <TableContainer component={Paper}>
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
        );
    }
    
}

const mapStateToProps = state=>({
    grades: state.grades.grades_data,
  });
  
  export default connect(mapStateToProps,{getGrades})(Grades);