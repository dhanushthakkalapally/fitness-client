import React from "react";

export const submitSpinner = (props) => {
    const {isSubmitting} = props;

    return (
        <>
            {isSubmitting && <i className="fas fa-spinner fa-spin"></i>}
        </>
    )
}
