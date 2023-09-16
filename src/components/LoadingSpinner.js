import React from "react";
import "../styles/loading_spinner.css";

export default function LoadingSpinner({ loadingMessage }) {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
            <p>{loadingMessage}</p>
        </div>
    );
}