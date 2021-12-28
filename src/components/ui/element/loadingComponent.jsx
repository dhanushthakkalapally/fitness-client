import React from 'react';
import {Spinner} from 'react-bootstrap';

class LoadingComponent extends React.Component {
    render() {
        const {text, padding, color} = this.props;

        return (
            <>
                <div className="d-flex justify-content-center">
                    <div style={{padding, color}}>
                        <Spinner animation="border" role="status"/>
                    </div>
                </div>
                <div className="text-center">{text}</div>
            </>
        );
    }
}

export default LoadingComponent;
