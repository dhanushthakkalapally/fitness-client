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
    return moment(dateTime, "YYYY-MM-DD hh:mm:ss").format("ddd, MMMM Do YYYY, h:mm:ss a");
};

export const formatDate = (dateTime) => {
    console.log(dateTime)
    return moment(dateTime, "YYYY-MM-DD").format("ddd, MMMM Do YYYY");
};
