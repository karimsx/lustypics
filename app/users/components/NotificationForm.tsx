import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { FormProvider, RHFSwitch, RHFTextField } from "app/core/components/hook-form"
import { z } from "zod"
import Form from "app/core/components/Form"

export const NotificationForm = () => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        Edit notification settings
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form submitText="Save" onSubmit={async (values) => {}}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {" "}
              Activity{" "}
            </Typography>
            <Typography variant="caption"> Your will receive website notification </Typography>
            <Stack mt={2}>
              <RHFSwitch hidden label="When gallery commented" name="fullname" />
              <RHFSwitch hidden label="When gallery liked" name="fullname" />
              <RHFSwitch hidden label="When followed" name="fullname" />
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
              <RHFSwitch hidden label="New website update" name="fullname" />
            </Stack>
          </Grid>
        </Grid>
      </Form>

      <Divider />
    </Paper>
  )
}
