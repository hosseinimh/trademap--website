import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { hsCodesPage as strings, general } from "../../../../constants/strings";
import * as funcs from "./funcs";
import {
    InputTextColumn,
    ListPage,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { searchHSCodeSchema as schema } from "../../../validations";

const HSCodes = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const columnsCount = 7;
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
            <th scope="col">{strings.trader}</th>
            {layoutState?.pageProps?.years?.map((item, index) => (
                <th scope="col" style={{ width: "150px" }} key={item}>
                    {item}
                </th>
            ))}
        </tr>
    );

    const renderItems = () => {
        const children = layoutState?.pageProps?.items?.map((item, index) => (
            <tr key={index}>
                <td scope="row">
                    {utils.en2faDigits(
                        (layoutState?.pageProps?.pageNumber - 1) * 10 +
                            index +
                            1
                    )}
                </td>
                <td>{item.trader}</td>
                <td>{utils.addCommasPersian(item.value1)}</td>
                <td>{utils.addCommasPersian(item.value2)}</td>
                <td>{utils.addCommasPersian(item.value3)}</td>
                <td>{utils.addCommasPersian(item.value4)}</td>
                <td>{utils.addCommasPersian(item.value5)}</td>
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

export default HSCodes;
