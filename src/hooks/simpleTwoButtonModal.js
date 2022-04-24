import React from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from "prop-types";

const SimpleTwoButtonModal = (props) => {
    const {
        showModal,
        children,
        submitText,
        cancelText,
        enableSubmit,
        onSubmit,
        onCancel,
        headerText,
        submitting,
        submitButtonType,
        showFooter
    } = props;
    return (
        <Modal isOpen={showModal} fade={false}>
            <ModalHeader toggle={() => onCancel()}>{headerText}</ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
            {showFooter && <ModalFooter>

                {onCancel &&
                    <button className="btn-dark btn btn-small btn-rounded" onClick={onCancel}>{cancelText}</button>}
                {onSubmit && <Button color={submitButtonType} disabled={!enableSubmit || submitting}
                                     onClick={() => onSubmit()}
                >
                    {submitText} {submitting && <i className="fa fa-spinner fa-spin"/>}
                </Button>}
            </ModalFooter>}

        </Modal>
    );
};

export default SimpleTwoButtonModal;

SimpleTwoButtonModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
    enableSubmit: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    headerText: PropTypes.string.isRequired,
    submitting: PropTypes.bool,
    submitButtonType: PropTypes.string,
    showFooter: PropTypes.bool
};

SimpleTwoButtonModal.defaultProps = {
    onCancel: undefined,
    onSubmit: undefined,
    cancelText: "Cancel",
    submitText: "Submit",
    enableSubmit: true,
    submitting: false,
    submitButtonType: "primary",
    showFooter: true
};
