// form
import {Controller, useFormContext} from 'react-hook-form';
// @mui
import {TextField, TextFieldProps} from '@mui/material';
import {MobileDatePicker} from "@mui/lab";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFMobileDatePicker({name, ...other}: IProps & TextFieldProps) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <MobileDatePicker
          label="Date de naissance"
          inputFormat="MM/dd/yyyy"
          {...field}
          renderInput={(params) => <TextField {...params} error={!!error} helperText={error?.message}  />}
        />
      )}
    />
  );
}
