import React, {Component} from "react";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};


class Dashboard extends Component {

    render() {
        const {auth} = this.props;
        return (
            <>
                <h2 className="text-center p-4">
                    Welcome {auth.firstName} :) We are getting there soon!
                </h2>
            </>
        )
    }
}

export default connect(mapStateToProps, null)(Dashboard);
