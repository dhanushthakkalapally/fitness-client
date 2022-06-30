import React, {Component} from "react";
import {connect} from 'react-redux';
import {createActivity, getActivities} from "../../appClient";
import Table from "../../sharedInteface/table";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {formatDate, formatDateTime} from "../../utils/generalUtils";
import {Auth, Amplify} from "aws-amplify";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const columnsConfig = [
    {
        Header: "Date",
        accessor: "activity_date",
        Cell: ({value}) => formatDate(value)
    },
    {
        Header: "weight",
        accessor: "curr_weight"
    },
    {
        Header: "Activity Duration",
        accessor: "duration"
    },
    {
        Header: "Start Time",
        accessor: "start_time",
        Cell: ({value}) => formatDateTime(value)
    },
    {
        Header: "End Time",
        accessor: "end_time",
        Cell: ({value}) => formatDateTime(value)

    }
]

const Dashboard = () => {

    return (
        <></>
    )
}

export default Dashboard;
