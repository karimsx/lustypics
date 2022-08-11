// form
import { useFormContext, Controller } from "react-hook-form"
// @mui
import { TextField, TextFieldProps } from "@mui/material"

// ----------------------------------------------------------------------

interface IProps {
  name: string
}

export default function RHFHiddenField({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <input type={"hidden"} value={field.value} />
      )}
    />
  )
}
