import React from "react";
import moment from "moment";

export const submitSpinner = (props) => {
    const {isSubmitting} = props;

    return (
        <>
            {isSubmitting && <i className="fas fa-spinner fa-spin"></i>}
        </>
    )
}

/***
 * Formats provided date and time string
 * @param dateTime {string}
 */
export const formatDateTime = (dateTime) => {
    return moment(dateTime).format("ddd, MMMM Do YYYY, h:mm:ss a");
};

export const formatDate = (dateTime) => {
    return moment(dateTime).format("ddd, MMMM Do YYYY");
};
