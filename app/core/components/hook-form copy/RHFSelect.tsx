// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {Select, TextField, TextFieldProps} from '@mui/material';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  children: any;
}

export default function RHFSelect({ name, children, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          fullWidth
          error={!!error}
        >
          {children}
        </Select>
      )}
    />
  );
}
