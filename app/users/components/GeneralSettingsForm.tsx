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
import { FormProvider, RHFTextField } from "app/core/components/hook-form"
import { z } from "zod"
import Form from "app/core/components/Form"

export const GeneralSettingsForm = () => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        Change your private information
      </Typography>
      <Typography variant="caption">
        Please read our terms of use to be informed how we manage your private data.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form submitText="Save" onSubmit={async (values) => {}}>
        <Typography variant="subtitle2"> Full name </Typography>
        <RHFTextField name="fullname" />

        <Typography variant="subtitle2"> Bio </Typography>
        <RHFTextField rows={6} multiline name="fullname" />

        <Typography variant="subtitle2"> Country </Typography>
        <RHFTextField name="fullname" />
      </Form>

      <Divider />
    </Paper>
  )
}
