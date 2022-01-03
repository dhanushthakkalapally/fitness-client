import React from 'react';
import {useField} from 'formik';

const InputElement = ({label, ...props}) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
        <div>
            <label htmlFor={props.id || props.name} className="text-capitalize"><strong>{label}</strong></label></div>
            <input className="text-input form-control" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};


export default InputElement;
