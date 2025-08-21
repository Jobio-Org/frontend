import * as React from "react";

import { FormHelperText, InputLabel, FormControl as MUIFormControl } from "@mui/material";
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    FormProvider,
    useFormContext
} from "react-hook-form";

export const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

export const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

export const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const { getFieldState, formState } = useFormContext();
    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    return {
        name: fieldContext.name,
        ...fieldState
    };
};

export const FormItem: React.FC<React.ComponentProps<typeof MUIFormControl>> = ({
    children,
    ...props
}) => {
    return (
        <MUIFormControl fullWidth {...props}>
            {children}
        </MUIFormControl>
    );
};

export const FormLabel: React.FC<React.ComponentProps<typeof InputLabel>> = ({
    children,
    ...props
}) => {
    const { name } = useFormField();

    return (
        <InputLabel htmlFor={name} {...props}>
            {children}
        </InputLabel>
    );
};

export const FormControl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return React.cloneElement(children as React.ReactElement);
};

export const FormMessage: React.FC = () => {
    const { error } = useFormField();
    if (!error) return null;

    return <FormHelperText error>{String(error.message)}</FormHelperText>;
};

export const FormDescription: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    return <FormHelperText>{children}</FormHelperText>;
};
