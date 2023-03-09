import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import utils from "../../utils/Utils";
import { basePath, USER_ROLES } from "../../constants";

function AuthRoute() {
    const us = useSelector((state) => state.userReducer);
    const lsUser = utils.getLSUser();

    return (
        <Router>
            {us.isAuthenticated && (
                <Routes>
                    {lsUser?.role === USER_ROLES.ADMINISTRATOR && (
                        <>
                            <Route
                                path={`${basePath}/users/login`}
                                element={<Navigate to={basePath} />}
                            />
                            <Route
                                path={`${basePath}/users/change_password/:userId`}
                                element={<Pages.ChangePasswordUser />}
                            />
                            <Route
                                path={`${basePath}/users/add`}
                                element={<Pages.AddUser />}
                            />{" "}
                            <Route
                                path={`${basePath}/users/edit/:userId`}
                                element={<Pages.EditUser />}
                            />
                            <Route
                                path={`${basePath}/users`}
                                element={<Pages.Users />}
                            />
                            <Route
                                path={`${basePath}/hs_files`}
                                element={<Pages.HSFiles />}
                            />
                            <Route
                                path={`${basePath}/hs_codes/:hs/:type`}
                                element={<Pages.HSCodes />}
                            />
                        </>
                    )}

                    {lsUser?.role === USER_ROLES.USER && <></>}

                    <Route path={basePath} element={<Pages.Dashboard />} />
                    <Route
                        path={`${basePath}/users/change_password`}
                        element={<Pages.ChangePasswordUser />}
                    />
                    <Route path="*" element={<Navigate to={basePath} />} />
                </Routes>
            )}
            {!us.isAuthenticated && (
                <Routes>
                    <Route
                        path={`${basePath}/users/login`}
                        exact={true}
                        element={<Pages.LoginUser />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to={`${basePath}/users/login`} />}
                    />
                </Routes>
            )}
        </Router>
    );
}

export default AuthRoute;
