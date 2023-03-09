import { useSelector } from "react-redux";

import { MESSAGE_CODES, MESSAGE_TYPES, rootPath } from "../../../../constants";
import { general, hsCodesPage as strings } from "../../../../constants/strings";
import { HSCode as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _navigate;
let _ls;
let _hs;
let _type;
let _pageProps;
let _callbackUrl;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _navigate = navigate;
    _ls = useSelector((state) => state.layoutReducer);
    _callbackUrl = `${rootPath}/hs_files`;
};

export const onLoad = (params) => {
    _pageProps = {
        pageNumber: 1,
        itemsCount: 0,
        item: null,
        items: null,
        years: null,
        action: null,
    };

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

    setPageProps(params?.hs, params?.type);
    fillForm();
};

export const onLayoutState = () => {
    if (_ls?.pageProps === null) {
        return;
    }

    if (_ls?.pageProps?.pageNumber !== _pageProps?.pageNumber) {
        _pageProps = _ls?.pageProps;

        fillForm();

        return;
    }
};

export const setPage = (page) => {
    _dispatch(setPagePropsAction({ pageNumber: page }));
};

export const onSubmit = (data) => {
    fillForm(data);
};

const setPageProps = (hs, type) => {
    _hs = !isNaN(hs) && hs > 0 ? hs : 0;
    _type = ["1", "2"].includes(type) ? type : 0;
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchPageData(data);

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async () => {
    if (_hs <= 0 || _type <= 0) {
        _dispatch(
            setMessageAction(
                general.itemNotFound,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.ITEM_NOT_FOUND,
                false
            )
        );
        _dispatch(setLoadingAction(false));
        _navigate(_callbackUrl);

        return null;
    }

    let result = await _entity.getPaginate(
        _hs,
        _type,
        _ls?.pageProps?.pageNumber ?? 1
    );

    if (result === null) {
        _dispatch(setPagePropsAction({ items: null }));
        _dispatch(
            setMessageAction(
                _entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                _entity.errorCode
            )
        );

        return;
    }
    console.log(result);

    _dispatch(
        setTitleAction(
            `${strings._title} [ ${_hs} - ${
                _type == "1" ? strings.import : strings.export
            } ]`
        )
    );
    _dispatch(
        setPagePropsAction({
            items: result.items,
            years: result.years,
            itemsCount: result.count,
        })
    );
};
