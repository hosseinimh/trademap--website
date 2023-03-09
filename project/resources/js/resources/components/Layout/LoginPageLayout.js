import React from "react";
import { useSelector } from "react-redux";

import { AlertState } from "../../components";
import { general } from "../../../constants/strings";
import BasePageLayout from "./BasePageLayout";

const LoginPageLayout = ({ children, strings, funcs, useForm }) => {
    const ls = useSelector((state) => state.layoutReducer);

    return (
        <BasePageLayout
            authPage={false}
            strings={strings}
            funcs={funcs}
            useForm={useForm}
        >
            <div className="bg-light d-flex flex-row align-items-center my-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card-group d-block d-md-flex row">
                                <div className="card col-md-7 p-4 mb-0">
                                    <div className="card-body">
                                        <h1>{strings._title}</h1>
                                        <p className="text-medium-emphasis">
                                            {strings.description}
                                        </p>
                                        <AlertState />
                                        {children}
                                        <div className="row">
                                            <div className="col-6">
                                                <button
                                                    onClick={useForm.handleSubmit(
                                                        funcs.onSubmit
                                                    )}
                                                    className="btn btn-success px-4"
                                                    type="button"
                                                    disabled={ls?.loading}
                                                >
                                                    {general.submit}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePageLayout>
    );
};

export default LoginPageLayout;
