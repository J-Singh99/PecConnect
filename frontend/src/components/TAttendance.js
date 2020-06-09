import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getList} from '../actions/student_list';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const useStyles = (theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  });

class TAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            code:'',
            sem :'',
            message:''
         }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState(
            { [event.target.name]:event.target.value }
          );
         event.preventDefault();
    }
    handleSubmit1(event){
        event.preventDefault();
        let data = {
            code: this.state.code,
            sem: this.state.sem,
        };
        this.props.getList(data);
    }
    handleSubmit(event){
        event.preventDefault();
        let data = {
            'course':this.state.code,
            'semester':this.state.sem,
            'attendance':[]
        }
        let students = this.props.student_list.student_list;
        console.log(students[0][0]);
        for(let i = 0;i <students.length;i++){
            var id = students[i];
            var checkbox = document.getElementById(id[0].toString(10));
            var d = {
                'sid':students[i][0],
                'attended':0,
                'missed':0
            }
            if (checkbox.checked){
                d.attended = 1;
            }
            else{
                d.missed = 1;
            }
            data.attendance.push(d);
        }
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
        };
        let token = this.props.token;
          // If token, add to headers config
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        axios.post('http://localhost:8000/updateattendance/',JSON.stringify(data),config)
            .then(res=>{
                this.setState({
                    message:'Successfully Added the attendance'
                })
                console.log(res);
            })
            .catch(
                err => console.log(err));
    }
    render(){
        const classes = this.props.classes;
        return(
            <>
                <form className={classes.root} noValidate onSubmit={this.handleSubmit1} autoComplete="off">
                <TextField id="code" label="Course Code" name = "code" onChange={this.handleChange} variant="outlined"/>
                <TextField id="sem" label="Semester" name = "sem" onChange={this.handleChange} variant="outlined"/>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Get Student List
                    </Button>
                </form>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>SID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Present/Absent</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.student_list==null?<div></div>:this.props.student_list.student_list==null?<div></div>:this.props.student_list.student_list.map(obj=>{
                                return(
                                    <TableRow>
                                        <TableCell>{obj[0]}</TableCell>
                                        <TableCell>{obj[1]}</TableCell>
                                        <TableCell align = "right"><Checkbox
                                            defaultChecked
                                            color="primary"
                                            inputProps={{ 'id':obj[0] }}
                                        /></TableCell>
                                    </TableRow>
                                );
                                
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                >Submit</Button>
                <p>{this.state.message}</p>
            </>
        );
    }

}



const mapStateToProps = state=>({
   student_list: state.student_list,
   token: state.auth.token,
});
  
export default compose(
    withStyles(useStyles),
    connect(mapStateToProps,{getList})
)(TAttendance);