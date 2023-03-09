import { User as Entity } from "../../../../http/entities";
import { useSelector } from "react-redux";

import { addUserPage as strings } from "../../../../constants/strings";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../../../../state/message/messageActions";
import {
    basePath,
    MESSAGE_CODES,
    MESSAGE_TYPES,
    USER_ROLES,
} from "../../../../constants";

let _dispatch;
let _navigate;
let _useForm;
let _ls;
let _pageProps;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate, useForm) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _useForm = useForm;
    _ls = useSelector((state) => state.layoutReducer);

    _callbackUrl = `${basePath}/users`;
};

export const onLoad = (params) => {
    _pageProps = {
        userType: USER_ROLES.ADMINISTRATOR,
        action: null,
    };

    _dispatch(setPagePropsAction(_pageProps));
    _dispatch(setTitleAction(strings._title));
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    if (_ls?.pageProps?.action) {
        _dispatch(setPagePropsAction({ action: null }));
    }
};

export const onType = (field) => {
    if (field === "administrator") {
        _dispatch(setPagePropsAction({ userType: USER_ROLES.ADMINISTRATOR }));
    } else {
        _dispatch(setPagePropsAction({ userType: USER_ROLES.USER }));
    }
};

export const onSubmit = async (data) => {
    _dispatch(setLoadingAction(true));
    _dispatch(clearMessageAction());

    let result =
        _ls?.pageProps?.userType === USER_ROLES.ADMINISTRATOR
            ? await _entity.storeAdmininistrator(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family,
                  data.mobile,
                  data.isActive ? 1 : 0
              )
            : await _entity.storeUser(
                  data.username,
                  data.password,
                  data.confirmPassword,
                  data.name,
                  data.family,
                  data.mobile,
                  data.isActive ? 1 : 0
              );

    if (result === null) {
        _dispatch(setLoadingAction(false));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }

    _dispatch(
        setMessageAction(
            strings.submitted,
            MESSAGE_TYPES.SUCCESS,
            MESSAGE_CODES.OK,
            false
        )
    );

    _navigate(_callbackUrl);
};

export const onCancel = () => {
    _navigate(_callbackUrl);
};
