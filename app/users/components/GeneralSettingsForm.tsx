import { useMutation } from "@blitzjs/rpc"
import { Divider, Paper, Typography } from "@mui/material"
import { RHFRadioGroup, RHFTextField } from "app/core/components/hook-form"
import Form from "app/core/components/Form"
import { useForm } from "react-hook-form"
import updateUser, { UpdateUserZod } from "../mutations/updateUser"
import RHFMobileDatePicker from "../../core/components/hook-form/RHFMobileDatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import RHFHiddenField from "../../core/components/hook-form/RHFHiddenField"
import { User } from "db"
import { useSnackbar } from "notistack"
import { RHFAutoComplete } from "../../core/components/hook-form/RHFAutoComplete"
import { FlagIcon } from "../../core/components/FlagIcon"
import countries from "i18n-iso-countries"
import { z } from "zod"
import { DevTool } from "@hookform/devtools";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"))

export interface GeneralSettingsFormProps {
  user: User,
}

export const GeneralSettingsForm = ({ user }: GeneralSettingsFormProps) => {

  const form = useForm({
    resolver: zodResolver(UpdateUserZod),
    mode: "onBlur",
    reValidateMode: "onBlur"
  })
  const { enqueueSnackbar } = useSnackbar()
  const [updateUserMutation] = useMutation(updateUser)

  const countriesMap = Object.entries(countries.getNames("en"))


  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        Change your private information
      </Typography>
      <Typography variant="caption">
        Please read our terms of use to be informed how we manage your private data.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form schema={UpdateUserZod}
            initialValues={{
              id: user.id,
              name: user.name || "",
              birthday: user.birthday || undefined,
              country: user.country || "",
              bio: user.bio || "",
              gender: (user.gender || undefined) as any,
            }}
            submitText="Save" onSubmit={async (values) => {
        const payload = {
          ...values,
          country: values?.country?.[0]
        }
        await updateUserMutation(payload)
        enqueueSnackbar("Account settings updated successfully")
      }}>

        <RHFHiddenField name={"id"} />
        <Typography variant="subtitle2"> Full name </Typography>
        <RHFTextField name="name" />

        <Typography variant="subtitle2"> Bio </Typography>
        <RHFTextField rows={6} multiline name="bio" />

        <Typography variant="subtitle2"> BirthDay </Typography>
        <RHFMobileDatePicker name="birthday" />


        <Typography variant="subtitle2"> Gender </Typography>
        <RHFRadioGroup options={["male", "female", "other"]} name="gender" />

        <Typography variant="subtitle2"> Country </Typography>
        <RHFAutoComplete
          label={"Pays"}
          renderOption={(props, option) => (<li key={option[0]} {...props}>
            <FlagIcon mr={1} countryCode={option[0]} />
            {option[1]}
          </li>)}
          isOptionEqualToValue={(option: any, value: any) => {
            return option[0] === value[0]
          }}
          getOptionLabel={(option) => option[1]} name={"country"}
          options={countriesMap} />
      </Form>

      <Divider />

    </Paper>
  )
}
