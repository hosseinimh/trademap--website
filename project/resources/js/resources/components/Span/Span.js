import React from "react";
import { useSelector } from "react-redux";

const Span = ({ children, className = "col-12" }) => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <span
            className={
                ls?.loading ? `placeholder ${className}` : `${className}`
            }
        >
            {children}
        </span>
    );
};

export default Span;
