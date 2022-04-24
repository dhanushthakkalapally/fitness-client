import React, {Component} from "react";
import {connect} from 'react-redux';
import {getActivities} from "../../appClient";
import Table from "../../sharedInteface/table";

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const columnsConfig = [
    {
        Header: "Date",
        accessor: "date_created"
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
        accessor: "start_time"
    },
    {
        Header: "End Time",
        accessor: "end_time"
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

    render() {
        const {auth} = this.props;
        const {activities} = this.state;
        return (
            <section className="h-100 d-flex justify-content-center">
                <div className="w-50">
                     <Table columnConfig={columnsConfig} data={activities} tableTitle="Activities"/>
                </div>
            </section>
        )
    }
}

export default connect(mapStateToProps, null)(Dashboard);
