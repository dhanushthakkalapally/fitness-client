import React, {Component} from "react";
import {connect} from 'react-redux';
import {getActivities} from "../../appClient";
import Table from "../../sharedInteface/table";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {formatDate, formatDateTime} from "../../utils/generalUtils";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const columnsConfig = [
    {
        Header: "Date",
        accessor: "date_created",
         Cell: (value) => formatDate(value)
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
        Cell: (value) => formatDateTime(value)
    },
    {
        Header: "End Time",
        accessor: "end_time",
                Cell: (value) => formatDateTime(value)

    }
]

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {activities: []}
    }

    componentDidMount() {
        const {auth} = this.props;
        const {userId} = auth;
        getActivities(userId).then(res => {
            const {data} = res;
            this.setState({activities: data})
        })
    }

    getActivityTrackerValues = (activities) => {
        activities.map(activity => {

        })
    }


    render() {
        const {activities} = this.state;
        // const values = this.getActivityTrackerValues(activities);
        return (
            <section className="h-100 d-flex justify-content-center">
                <div className="w-50">
                    <Table columnConfig={columnsConfig} data={activities} tableTitle="Activities" enableSearch/>
                    <div>
                        <h2>Activity Tracker</h2>
                        {/*<div className="border border-4 border-dark">*/}
                        {/*    <CalendarHeatmap*/}
                        {/*        startDate={new Date('2021-12-31')}*/}
                        {/*        endDate={new Date('2022-12-31')}*/}
                        {/*        values={values}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>

            </section>
        )
    }
}

export default connect(mapStateToProps, null)(Dashboard);
