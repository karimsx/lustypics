import { useMutation } from "@blitzjs/rpc"
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { RHFSwitch } from "app/core/components/hook-form"
import Form from "app/core/components/Form"
import updateUserNotificationsSettings from "../mutations/updateUserNotificationsSettings"
import { useSnackbar } from "notistack"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

export const NotificationForm = () => {
  const user = useCurrentUser()
  const [updateUserNotificationSettingsMutation] = useMutation(updateUserNotificationsSettings)
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {whenGalleryCommented: false,
    whenGalleryLiked: false,
    whenFollowed: false,
    whenWebsiteUpdate: false,
  }

  user?.notificationsSetting?.forEach(notificationSettings => initialValues[notificationSettings.content] = notificationSettings.enabled)

  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        Edit notification settings
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form submitText="Save" initialValues={initialValues} onSubmit={async (values) => {
        await updateUserNotificationSettingsMutation(values)
        await enqueueSnackbar("Notification settings updated successfully")
      }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {" "}
              Activity{" "}
            </Typography>
            <Typography variant="caption"> Your will receive website notification </Typography>
            <Stack mt={2}>
              <RHFSwitch hidden label="When gallery commented" name="whenGalleryCommented" />
              <RHFSwitch hidden label="When gallery liked" name="whenGalleryLiked" />
              <RHFSwitch hidden label="When followed" name="whenFollowed" />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {" "}
              Event{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              Your will received email and website notification{" "}
            </Typography>
            <Stack mt={2}>
              <RHFSwitch hidden label="New website update" name="whenWebsiteUpdate" />
            </Stack>
          </Grid>
        </Grid>
      </Form>

      <Divider />
    </Paper>
  )
}
