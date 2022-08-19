import { Autocomplete, InputAdornment, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"

interface HfAutoCompleteProps {
  getOptionLabel: (option: any) => string
  renderOption?: (props: any, option: any) => JSX.Element
  isOptionEqualToValue?: (option: any, value: any) => boolean
  label?: string
  name: any
  options: any
  placeholder?: string

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
  placeholder,
  ...other
}: HfAutoCompleteProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        formState: { touchedFields, isSubmitted, errors },
        field: { onChange, onBlur, value },
      }) => (
        <Autocomplete
          {...other}
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
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              onBlur={onBlur}
              placeholder={!value ? placeholder : ""}
              error={(touchedFields[name] || isSubmitted) && Boolean(errors?.[name])}
              // helperText={errors?.[name]?.message}
              inputProps={{
                ...params.inputProps,
                autoComplete: "disabled",
              }}
            />
          )}
        />
      )}
    />
  )
}
