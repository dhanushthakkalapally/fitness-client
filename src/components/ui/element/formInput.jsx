import React, {Component} from "react";
import PropTypes from "prop-types";
import '../styles/formInput.css';

class FormInput extends Component {


    render() {
        const {id, label, type, value, onChangeHandler} = this.props;
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
                           type={type}
                           value={value}
                           onChange={onChangeHandler}
                    />
                </div>
            </div>
        )
    }
}

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
};

FormInput.defaultProps = {
    type: "input"
};

export default FormInput;