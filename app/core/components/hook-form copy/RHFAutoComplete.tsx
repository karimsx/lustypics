import {Autocomplete, InputAdornment, TextField} from "@mui/material"
import {Controller, useFormContext} from "react-hook-form"
import {FlagIcon} from "../FlagIcon";

interface HfAutoCompleteProps {
    getOptionLabel: (option: any) => string,
    renderOption: (props: any, option: any) => JSX.Element,
    isOptionEqualToValue: (option: any, value: any) => boolean
    label?: string
    name: any
    options: any

    [x: string]: any
}

export const RHFAutoComplete = ({
                                    name,
                                    options,
                                    label,
                                    isOptionEqualToValue,
                                    defaultValue,
                                    getOptionLabel,
                                    renderOption,
                                    onInputChange,
                                    ...other
                                }: HfAutoCompleteProps) => {
    const {control} = useFormContext()

    return (<Controller
        control={control}
        name={name}
        {...other}
        render={({
                     formState: {touchedFields, isSubmitted, errors}, field: {onChange, onBlur, value}
                 }) => (<Autocomplete
            blurOnSelect={true}
            clearOnBlur={true}
            options={options}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            isOptionEqualToValue={isOptionEqualToValue}
            autoHighlight
            disableClearable={true}
            value={value}
            onChange={(evt, value, reason) => {
                onChange(value)
            }}
            onInputChange={onInputChange}
            // inputValue={value?.title || ""}
            onBlur={onBlur}
            renderInput={(params) => (<TextField
                {...params}
                label={label}
                onBlur={onBlur}
                InputProps={{
                    ...(params?.InputProps || {}),
                    startAdornment: (
                        <InputAdornment position="start">
                            {value && value[0] && <FlagIcon countryCode={value?.[0]}/>}
                        </InputAdornment>
                    ),
                }}
                error={(touchedFields[name] || isSubmitted) && Boolean(errors?.[name])}
                helperText={errors?.[name]?.message}
                inputProps={{
                    ...params.inputProps, autoComplete: "disabled",
                }}
            />)}
        />)}
    />)
}