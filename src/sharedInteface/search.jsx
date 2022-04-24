import React, {useState} from "react";
import PropTypes from "prop-types";

const Search = (props) => {
    const {
        placeholder,
        onChange,
        initialValue
    } = props;
    const [value, setValue] = useState(initialValue);
    const handleSearchChange = (event) => {
        const {value} = event.target;
        setValue(value);
        onChange(value);
    };
    return (
        <>
            <input type="text"
                   className="form-control search"
                   placeholder={placeholder}
                   value={value}
                   onChange={handleSearchChange}
            />
        </>
    );
};

export default Search;

Search.propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
};

Search.defaultProps = {
    initialValue: ""
};
