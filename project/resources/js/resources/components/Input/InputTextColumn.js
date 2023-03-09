import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const InputTextColumn = ({
    field,
    type = "text",
    useForm,
    columnClassName = "col-md-3 col-12 pb-4",
    strings = null,
    icon = null,
    inputStyle = {},
    defaultValue = "",
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const ms = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
            setPlaceholder(
                ls?.pageProps?.strings &&
                    `${field}Placeholder` in ls.pageProps.strings
                    ? ls.pageProps.strings[`${field}Placeholder`]
                    : ""
            );
        }

        if (!useForm) {
            setForm(ls?.pageProps?.useForm);
        }
    }, [ls]);

    const renderInput = (field) => (
        <>
            <input
                id={field.name}
                {...field}
                className={
                    ms?.messageField === field.name
                        ? "form-control is-invalid"
                        : "form-control"
                }
                placeholder={placeholder}
                disabled={ls?.loading}
                type={type}
                style={{ ...inputStyle }}
            />
            {ms?.messageField === field.name && (
                <div className="invalid-feedback">{ms?.message}</div>
            )}
        </>
    );

    return (
        <div className={columnClassName}>
            <label className="form-label" htmlFor={field}>
                {label}
            </label>
            {icon && form && (
                <div className="input-group has-validation mb-2">
                    <span className="input-group-text">{icon}</span>
                    <Controller
                        render={({ field }) => renderInput(field)}
                        name={field}
                        control={form?.control}
                        defaultValue={defaultValue}
                    />
                </div>
            )}
            {!icon && form && (
                <Controller
                    render={({ field }) => renderInput(field)}
                    name={field}
                    control={form?.control}
                    defaultValue={defaultValue}
                />
            )}
        </div>
    );
};

export default InputTextColumn;
