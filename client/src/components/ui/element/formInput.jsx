import React, {Component} from "react";
import PropTypes from "prop-types";
import '../styles/formInput.css';

class FormInput extends Component {


    render() {
        const {id, label} = this.props;
        return (
            <div className="input-group formInput d-block mb-3">
                <div>
                    <label htmlFor={id}>
                        {label} :
                    </label>
                </div>
                <div>
                    <input type="text"
                           id={id}
                           className="form-control"
                           aria-label="Default"
                    />
                </div>
            </div>
        )
    }
}

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

FormInput.defaultProps = {};

export default FormInput;