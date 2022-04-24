import React, {Component} from "react";
import {connect} from 'react-redux';
import {getActivities} from "../../appClient";
import Table from "../../sharedInteface/table";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {formatDate, formatDateTime} from "../../utils/generalUtils";
import moment from "moment";

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
        return activities.map(activity =>  {
            const {date_created: date} = activity;
            const {duration} =  activities[0]
            const formattedTime = moment(duration, "hh:mm:ss");
            const hours = formattedTime.hours() * 60;
            const minutes = formattedTime.minutes();
            return {date, count:hours + minutes}
        })
    }


    render() {
        const {activities} = this.state;
        const values = this.getActivityTrackerValues(activities);
        console.log(values)
        return (
            <section className="h-100 d-flex justify-content-center">
                <div className="w-50">
                    <Table columnConfig={columnsConfig} data={activities} tableTitle="Activities" enableSearch/>
                    <div>
                        <h2>Activity Tracker</h2>
                        <div className="border border-4 border-dark">
                            <CalendarHeatmap
                                startDate={moment().startOf('year') - 1}
                                endDate={new Date('2022-12-31')}
                                values={values}
                                showMonthLabels
                                gutterSize={5}

                                showWeekdayLabels
                            />
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}

export default connect(mapStateToProps, null)(Dashboard);
