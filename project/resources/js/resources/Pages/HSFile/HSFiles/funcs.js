import { useSelector } from "react-redux";

import { MESSAGE_TYPES } from "../../../../constants";
import { hsFilesPage as strings } from "../../../../constants/strings";
import { HSFile as Entity } from "../../../../http/entities";
import {
    setLoadingAction,
    setPagePropsAction,
    setTitleAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

let _dispatch;
let _ls;
let _pageProps;
let _entity = new Entity();

export const init = (dispatch, navigate) => {
    _dispatch = dispatch;
    _ls = useSelector((state) => state.layoutReducer);
};

export const onLoad = (params) => {
    _pageProps = {
        pageNumber: 1,
        itemsCount: 0,
        item: null,
        items: null,
        action: null,
    };

    _dispatch(setTitleAction(strings._title));
    _dispatch(setPagePropsAction(_pageProps));

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

    if (_ls?.pageProps?.action !== _pageProps?.action) {
        _pageProps = _ls?.pageProps;

        _dispatch(setPagePropsAction({ action: null }));
    }

    switch (_ls?.pageProps?.action) {
        case "DOWNLOAD":
            downloadAction(_ls?.pageProps?.item);

            return;
    }
};

export const onDownload = (item) => {
    _dispatch(
        setPagePropsAction({
            action: "DOWNLOAD",
            item,
        })
    );
};

export const setPage = (page) => {
    _dispatch(setPagePropsAction({ pageNumber: page }));
};

export const onSubmit = (data) => {
    fillForm(data);
};

const downloadAction = async (item) => {
    if (!isNaN(item?.id) && item?.id > 0) {
        _dispatch(setLoadingAction(true));

        await _entity.download(item.hs, item.type);

        _dispatch(setLoadingAction(false));
    }
};

const fillForm = async (data = null) => {
    _dispatch(setLoadingAction(true));

    await fetchPageData(data);

    _dispatch(setLoadingAction(false));
};

const fetchPageData = async (data) => {
    let result = await _entity.getPaginate(
        data?.hs ?? 0,
        data?.type ?? 1,
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

    if (_ls?.pageProps?.pageNumber === 1) {
        _dispatch(
            setPagePropsAction({
                items: result.items,
                itemsCount: result.count,
            })
        );
    } else {
        _dispatch(
            setPagePropsAction({
                items: result.items,
                itemsCount: result.count,
            })
        );
    }
};
