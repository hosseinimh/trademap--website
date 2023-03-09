const serverConfig = require("../../../server-config.json");
const { baseUrl } = serverConfig;

export const SERVER_URL = `${baseUrl}/api`;

export const DASHBOARD_API_URLS = {
    FETCH_USER_REVIEW: `${SERVER_URL}/dashboard/review_user`,
    FETCH_ADMIN_REVIEW: `${SERVER_URL}/dashboard/review_admin`,
};

export const USERS_API_URLS = {
    LOGIN: `${SERVER_URL}/users/login`,
    LOGOUT: `${SERVER_URL}/users/logout`,
    FETCH_USER: `${SERVER_URL}/users/show`,
    FETCH_USER_CITIES: `${SERVER_URL}/users/show/cities`,
    FETCH_USERS: `${SERVER_URL}/users`,
    STORE_USER: `${SERVER_URL}/users/store`,
    UPDATE_USER: `${SERVER_URL}/users/update`,
    CHANGE_PASSWORD: `${SERVER_URL}/users/change_password`,
};

export const HS_FILES_API_URLS = {
    FETCH_HS_FILES: `${SERVER_URL}/hs_files`,
    DOWNLOAD_HS_FILE: `${SERVER_URL}/hs_files/download`,
};

export const HS_CODES_API_URLS = {
    FETCH_HS_CODES: `${SERVER_URL}/hs_codes`,
};
