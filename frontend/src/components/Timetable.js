import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getTimeTable} from '../actions/timetable';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';

function TimetableDisplay(props) {
  
  if (props.timetable==null){
    return(<div></div>);
  }
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
      ]}
      data={[
        { time: '8-9', monclass: props.timetable[0]['subject_1'], tueclass:props.timetable[1]['subject_1'] , wedclass: props.timetable[2]['subject_1'], thuclass: props.timetable[3]['subject_1'], friclass:props.timetable[4]['subject_1'], satclass: props.timetable[5]['subject_1']},
        { time: '9-10', monclass: props.timetable[0]['subject_2'], tueclass: props.timetable[1]['subject_2'], wedclass: props.timetable[2]['subject_2'], thuclass: props.timetable[3]['subject_2'], friclass: props.timetable[4]['subject_2'], satclass: props.timetable[5]['subject_2']},
        { time: '10-11', monclass: props.timetable[0]['subject_3'], tueclass: props.timetable[1]['subject_3'], wedclass: props.timetable[2]['subject_3'], thuclass: props.timetable[3]['subject_3'], friclass: props.timetable[4]['subject_3'], satclass: props.timetable[5]['subject_3']},
        { time: '11-12', monclass: props.timetable[0]['subject_4'], tueclass: props.timetable[1]['subject_4'], wedclass: props.timetable[2]['subject_4'], thuclass: props.timetable[3]['subject_4'], friclass: props.timetable[4]['subject_4'], satclass: props.timetable[5]['subject_4']},
        { time: '12-1', monclass: props.timetable[0]['subject_5'], tueclass: props.timetable[1]['subject_5'], wedclass: props.timetable[2]['subject_5'], thuclass: props.timetable[3]['subject_5'], friclass: props.timetable[4]['subject_5'], satclass: props.timetable[5]['subject_5']},
        { time: '1-2', monclass: '', tueclass: '', wedclass: '', thuclass: '', friclass: '', satclass: ''},
        { time: '2-3', monclass: props.timetable[0]['subject_6'] ,tueclass: props.timetable[1]['subject_6'], wedclass: props.timetable[2]['subject_6'], thuclass : props.timetable[3]['subject_6'], friclass: props.timetable[4]['subject_6'], satclass: props.timetable[5]['subject_6']},
        { time: '3-4', monclass: props.timetable[0]['subject_7'], tueclass: props.timetable[1]['subject_7'], wedclass: props.timetable[2]['subject_7'], thuclass: props.timetable[3]['subject_7'], friclass: props.timetable[4]['subject_7'], satclass: props.timetable[5]['subject_7']},
        { time: '4-5', monclass: props.timetable[0]['subject_8'], tueclass: props.timetable[1]['subject_8'], wedclass: props.timetable[2]['subject_8'], thuclass:props.timetable[3]['subject_8'], friclass: props.timetable[4]['subject_8'], satclass: props.timetable[5]['subject_8']},
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
                    <h1>Timetable!</h1>
                </Paper>
                {this.props.timetable==null?<div></div>:<TimetableDisplay timetable={this.props.timetable.timetable}/>}
            </>
            
        );
    }
}
const mapStateToProps = state=>({
    timetable: state.timetable.timetable_data,
});

export default connect(mapStateToProps,{getTimeTable})(Timetable);

