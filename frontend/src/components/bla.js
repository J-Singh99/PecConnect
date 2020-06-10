import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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


const helper= (profile)=>{
    if(profile==null){
        return <div></div>;
    }
    console.log(profile);
    return(
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>{profile.firstname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last Name</TableCell>
                        <TableCell>{profile.lastname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>{profile.user.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>{profile.user.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Date Of Birth</TableCell>
                        <TableCell>{profile.date_of_birth}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Gender</TableCell>
                        <TableCell>{profile.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>SID</TableCell>
                        <TableCell>{profile.unique_id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Department</TableCell>
                        <TableCell>{profile.department.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Programme</TableCell>
                        <TableCell>{profile.programme}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Semester</TableCell>
                        <TableCell>{profile.semester}</TableCell>
                    </TableRow>
                    
                    
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const TimeTable= (profile)=>{
    if(profile==null){
        return <div></div>;
    }
    console.log(profile);
    return(
        <div>
        <Grid container spacing={3}>
          <Grid item xs={3} sm={3}>
            <Card>
              <CardBody>
                <center><h1>Here's your time table for the day</h1></center>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                            <TableCell>9:00-11:00 </TableCell>
                            <TableCell>Boring</TableCell>
                            </TableRow>
                        <TableRow>
                            <TableCell>11:00-1:00 </TableCell>
                            <TableCell>Kill Me</TableCell>
                            </TableRow>
                        <TableRow>
                            <TableCell>1:00-2:00 </TableCell>
                            <TableCell>Pubg khelte hai</TableCell>
                            </TableRow>    
                        </TableBody>
                    </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </Grid>
           <Grid item xs={2} sm={5}>
            <Card>
              <CardBody>
              <img src = "https://aras.kntu.ac.ir/wp-content/uploads/2019/05/hoodie-.png" height = "400" />                
              <center><h1>Hey there, {profile.user.username}</h1></center>
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={3} sm={4}>
            <Card>
              <CardBody>
                <center><h1>Notifications</h1></center>
                <ol>
                    <li>ML at 11:00 Am, low attendace</li>
                    <br />
                    <li>You are free from 1-2, might wanna get that SID made</li>
                    <br />
                    <li>MAN-104 assignment due today!</li>
                </ol>
                <br />
                <center><h1>Messages</h1></center>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow>
                            <TableCell>Lame Prof 1 </TableCell>
                            <TableCell>10:00 Am </TableCell>
                            <TableCell>Class attend karlena</TableCell>
                            </TableRow>
                        <TableRow>
                            <TableCell>Library Attendant</TableCell>
                            <TableCell>1:00 Pm</TableCell>
                            <TableCell>Return book please</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

              </CardBody>
            </Card>
          </Grid>
        </Grid>
        </div>

    )
}


class Dashboard extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    }
    render(){
        const {classes} = this.props;
        return(
            <div>
                {TimeTable(this.props.profile)}
            
            </div>
        );
    }

}
const mapStateToProps = state=>({
    profile:state.auth.user,
});

export default connect(mapStateToProps)(Dashboard)