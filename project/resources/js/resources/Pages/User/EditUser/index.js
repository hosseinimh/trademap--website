import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    InputRadioColumn,
    InputSwitchCheckboxColumn,
    InputTextColumn,
    FormPage,
} from "../../../components";
import * as funcs from "./funcs";
import { editUserPage as strings } from "../../../../constants/strings";
import { editUserSchema as schema } from "../../../validations";

const EditUser = () => {
    const form = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <FormPage page={"Users"} strings={strings} funcs={funcs} useForm={form}>
            <InputTextColumn field="name" />
            <InputTextColumn field="family" />
            <InputTextColumn
                type="number"
                field="mobile"
                inputStyle={{ textAlign: "left" }}
            />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputSwitchCheckboxColumn field="active" checked={true} />
            </div>
            <div className="col-md-6 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    checked={true}
                    onChange={(e) => funcs.onType("administrator")}
                />
                <InputRadioColumn
                    field="user"
                    name="type"
                    onChange={(e) => funcs.onType("user")}
                />
            </div>
        </FormPage>
    );
};

export default EditUser;
