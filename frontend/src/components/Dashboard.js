import React from 'react';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
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
class Dashboard extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    }
    render(){
        const {classes} = this.props;
        return(
            <Paper className={classes.paper}>
                <h1>Welcome</h1>
                <h2>Your life sucks!</h2>
                {helper(this.props.profile)}
            </Paper>
        );
    }

}
const mapStateToProps = state=>({
    profile:state.auth.user,
});

export default connect(mapStateToProps)(Dashboard)