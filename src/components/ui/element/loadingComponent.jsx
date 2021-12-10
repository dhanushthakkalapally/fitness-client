import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

class LoadingComponent extends React.Component {
    render() {
        const {text, padding, children, color} = this.props;

        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                    <div style={{padding, color}}>
                        <Spinner animation="border" role="status" />
                        {children}
                        <div className="text-start">{text}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingComponent;