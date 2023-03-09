import React from "react";
import { useSelector } from "react-redux";

import { footer as strings, general } from "../../../constants/strings";

const LoginFooter = () => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <>
            <footer className="footer d-print-none bg-dark px-4">
                <p className="small text-light my-0">{strings.copyright}</p>
                <p className="developer small">
                    <a
                        href={strings.developerUrl}
                        target={"_blank"}
                        className="link"
                    >
                        {strings.developer}
                    </a>
                </p>
            </footer>
            <div
                className="loading-wrapper"
                style={{
                    display: ls?.loading ? "flex" : "none",
                }}
            >
                <div className="loading"></div>
                <p>{general.loading}</p>
            </div>
        </>
    );
};

export default LoginFooter;
