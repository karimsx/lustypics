import { Autocomplete, CircularProgress, InputAdornment, TextField } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { useState } from "react"

interface HfAutoCompleteProps {
  getOptionLabel: (option: any) => string
  renderOption: (props: any, option: any) => JSX.Element
  isOptionEqualToValue: (option: any, value: any) => boolean
  label?: string
  name: any
  options: any

  [x: string]: any
}

export const RHFAsyncAutocomplete = ({
  name,
  options,
  label,
  isOptionEqualToValue,
  defaultValue,
  getOptionLabel,
  loading,
  renderOption,
  onInputChange,
  ...other
}: HfAutoCompleteProps) => {
  const { control } = useFormContext()
  const [inputValue, setInputValue] = useState("")

  return (
    <Controller
      control={control}
      name={name}
      {...other}
      render={({
        formState: { touchedFields, isSubmitted, errors },
        field: { onChange, onBlur, value },
      }) => (
        <Autocomplete
          blurOnSelect={true}
          clearOnBlur={true}
          options={options}
          filterOptions={(x) => x}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          isOptionEqualToValue={isOptionEqualToValue}
          autoHighlight
          autoComplete
          includeInputInList
          filterSelectedOptions
          onInputChange={onInputChange}
          disableClearable={true}
          loading={loading}
          value={value}
          onChange={(evt, value, reason) => {
            onChange(value)
          }}
          // inputValue={value?.title || ""}
          onBlur={onBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...(params?.InputProps || {}),
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              error={(touchedFields[name] || isSubmitted) && Boolean(errors?.[name])}
              // helperText={errors?.[name]?.message || ''}
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
