import React, {Component} from "react";
import {connect} from 'react-redux';
import {getActivities} from "../../appClient";
import Table from "../../sharedInteface/table";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {formatDate, formatDateTime} from "../../utils/generalUtils";
import moment from "moment";
import SimpleTwoButtonModal from "../../hooks/simpleTwoButtonModal";
import {Formik, Form} from "formik";
import InputElement from "../../sharedInteface/inputElement";

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

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            activities: [],
            activityCreateModal: {showModal: false}
        }
    }

    componentDidMount() {
        const {auth} = this.props;
        const {userId} = auth;
        getActivities(userId).then(res => {
            const {data} = res;
            this.setState({activities: data})
        })
        document.title = "dashboard";
    }

    getActivityTrackerValues = (activities) => {
        return activities.map(activity => {
            const {activity_date: date} = activity;
            const {duration} = activities[0]
            const formattedTime = moment(duration, "hh:mm:ss");
            const hours = formattedTime.hours() * 60;
            const minutes = formattedTime.minutes();
            return {date, count: hours + minutes}
        })
    }

    getInitialValues = () => {
        return {
            date: `${moment().date()}-${moment().month()}-${moment().year()}`,
            currWeight: 55,
            startTime: `${moment().hours()}:${moment().minutes()}:${moment().seconds()}`,
            endTime: `${moment().add(1, "hours").hours()}:${moment().minutes()}:${moment().seconds()}`
        }
    }

    render() {
        const {activities, activityCreateModal} = this.state;
        const {showModal} = activityCreateModal;
        const values = this.getActivityTrackerValues(activities);
        const initialValues = this.getInitialValues();
        return (
            <section className="h-100 d-flex justify-content-center">
                <SimpleTwoButtonModal headerText="Add Activity"
                                      showModal={showModal}
                                      onCancel={() => {
                                          this.setState({activityCreateModal: {showModal: false}})
                                      }}
                                      showFooter={false}
                >
                    <Formik initialValues={initialValues}>
                        {
                            () => (
                                <Form>
                                    <div className="p-2">
                                        <InputElement label="Activity Date" name="date" id="date"/>
                                    </div>
                                    <div className="p-2">
                                        <InputElement label="Start Time" name="startTime" id="startTime"/>
                                    </div>
                                    <div className="p-2">
                                        <InputElement label="End Time" name="endTime" id="endTime"/>
                                    </div>
                                    <div className="p-2">
                                        <InputElement type="number" min={10} max={1000} label="Weight" name="currWeight"
                                                      id="currWeight"/>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-sm btn-primary">Submit</button>
                                    </div>
                                </Form>
                            )

                        }

                    </Formik>
                </SimpleTwoButtonModal>
                <div className="w-50 p-5">
                    <Table columnConfig={columnsConfig} data={activities} tableTitle="Activities" enableSearch
                           tableToolBarElements={() => (
                               <span><button className="btn btn-sm btn-primary" onClick={() => {
                                   this.setState({activityCreateModal: {showModal: true}})
                               }}>Add Activity</button></span>
                           )}
                    />
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
