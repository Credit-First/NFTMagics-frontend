import React from "react";
import PropTypes from "prop-types";
import { toast, TypeOptions } from "react-toastify";
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle
} from "react-icons/fa";

export const displayIcon = (type: any) => {
    switch (type) {
        case "success":
            return <FaCheck />;
        case "info":
            return <FaInfo />;
        case "error":
            return <FaExclamationCircle />;
        case "warning":
            return <FaExclamationTriangle />;
        default:
            return <FaBug />;
    }
};

const ToastMessage = ({ type, message }: { type: string, message: string }) => {
    const content = (
        <div style={{ display: "flex", color: "white" }}>
            <div
                style={{
                    fontSize: 15,
                    paddingTop: 8,
                    flexShrink: 0,
                    textAlign: "center",
                    width: "30px"
                }}
            >
                {displayIcon(type)}
            </div>
            <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
                {message}
            </div>
        </div>
    );
    switch (type) {
        case 'loading':
            toast[type](message);
            break;
        case 'success':
            toast[type](message);
            break;
        case 'info':
            toast[type](message);
            break;
        case 'error':
            toast[type](message);
            break;
        case 'warning':
            toast[type](message);
            break;
        case 'warn':
            toast[type](message);
            break;
        case 'dark':
            toast[type](message);
            break;
        default:
            break;
    }
}

ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
