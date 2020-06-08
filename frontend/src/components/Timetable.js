import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getTimeTable} from '../actions/timetable';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';

function TimetableDisplay(props) {

    return(
        <MaterialTable 
      title="Your TimeTable"
      columns={[
        {
          title: 'Time', field: 'time',
          cellStyle: {
            backgroundColor: '#039be5',
            color: '#FFF'
          },
          headerStyle: {
            backgroundColor: '#039be5',
          }
        },
        { title: 'Monday', field: 'monclass'},
        { title: 'Tuesday', field: 'tueclass'},
        { title: 'Wednesday', field: 'wedclass'},
        { title: 'Thursday', field: 'thuclass'},
        { title: 'Friday', field: 'friclass'},
        { title: 'Saturday', field: 'satclass'},
        { title: 'Sunday', field: 'sunclass'},
      ]}
      data={[
        { time: '8-9', monclass: '', tueclass: '', wedclass: 'Data Structures', thuclass: '', friclass: '', satclass: '', sunclass: ''},
        { time: '9-10', monclass: '', tueclass: 'EVS', wedclass: '', thuclass: '', friclass: 'DELD Lab', satclass: '', sunclass: ''},
        { time: '10-11', monclass: 'Data Structures Lab', tueclass: 'Math', wedclass: '', thuclass: 'EVS', friclass: 'DELD Lab', satclass: '', sunclass: ''},
        { time: '11-12', monclass: 'Data Structures Lab', tueclass: 'Intro to ECE', wedclass: 'DELD', thuclass: 'Ethics', friclass: 'DELD', satclass: '', sunclass: ''},
        { time: '12-1', monclass: 'DELD', tueclass: 'Math tut', wedclass: 'EVS', thuclass: 'Intro to ECE tut', friclass: '', satclass: '', sunclass: ''},
        { time: '1-2', monclass: '', tueclass: '', wedclass: '', thuclass: '', friclass: '', satclass: '', sunclass: ''},
        { time: '2-3', monclass: 'Maths',tueclass: 'Data Sructures', wedclass: '', thuclass: 'Siemens Lab', friclass: 'Math', satclass: '', sunclass: ''},
        { time: '3-4', monclass: 'Intro to ECE', tueclass: '', wedclass: '', thuclass: 'Data Structures', friclass: 'Intro to ECE', satclass: '', sunclass: ''},
        { time: '4-5', monclass: 'Ethics', tueclass: '', wedclass: '', thuclass: '', friclass: 'EVS', satclass: '', sunclass: ''},
      ]}
      options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
    />
    );
}

class Timetable extends React.Component {
    static propTypes = {
        timetable: PropTypes.object.isRequired,
    }
    componentDidMount() {
        this.props.getTimeTable();
    }
    render() {
        const {classes} = this.props;

        return(
            <>
                <Paper className={classes.paper}>
                    <h1>You have a shitty Timetable!</h1>
                    <p>{JSON.stringify(this.props.timetable)}</p>
                </Paper>
                <TimetableDisplay/>
            </>
            
        );
    }
}
const mapStateToProps = state=>({
    timetable: state.timetable.timetable_data,
});

export default connect(mapStateToProps,{getTimeTable})(Timetable);

