import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { hsFilesPage as strings, general } from "../../../../constants/strings";
import * as funcs from "./funcs";
import {
    InputTextColumn,
    ListPage,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { searchHSFileSchema as schema } from "../../../validations";
import { Link } from "react-router-dom";
import { basePath, rootPath } from "../../../../constants";

const HSFiles = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const columnsCount = 5;
    const form = useForm({
        resolver: yupResolver(schema),
    });

    const renderSearch = () => (
        <div className="row">
            <InputTextColumn
                field="hs"
                inputStyle={{
                    textAlign: "left",
                }}
                type="number"
            />
        </div>
    );

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.hs}
            </th>
            <th scope="col" style={{ width: "150px" }}>
                {strings.type}
            </th>
            <th scope="col">{strings.tradesCount}</th>
            <th scope="col" style={{ width: "150px" }}>
                {general.actions}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = layoutState?.pageProps?.items?.map((item, index) => (
            <tr key={item.id}>
                <td scope="row">
                    {utils.en2faDigits(
                        (layoutState?.pageProps?.pageNumber - 1) * 10 +
                            index +
                            1
                    )}
                </td>
                <td>
                    <Link to={`${basePath}/hs_codes/${item.hs}/${item.type}`}>
                        {item.hs}
                    </Link>
                </td>
                <td>{item.type === 1 ? strings.import : strings.export}</td>
                <td>
                    {utils.addCommasPersian(Math.floor(item.tradesCount / 5))}
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-success px-4"
                        onClick={() => funcs.onDownload(item)}
                        title={strings.download}
                        disabled={layoutState?.loading}
                    >
                        {strings.download}
                    </button>
                </td>
            </tr>
        ));

        return <TableItems columnsCount={columnsCount} children={children} />;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} funcs={funcs} />
    );

    return (
        <ListPage
            page={"HSFiles"}
            strings={strings}
            useForm={form}
            table={{ renderHeader, renderItems, renderFooter }}
            funcs={funcs}
            hasAdd={false}
        >
            <SearchBox useForm={form} onSubmit={funcs.onSubmit}>
                {renderSearch()}
            </SearchBox>
        </ListPage>
    );
};

export default HSFiles;
