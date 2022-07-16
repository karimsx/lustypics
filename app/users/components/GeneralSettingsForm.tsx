import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
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
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { FormProvider } from "app/core/components/hook-form"
import { z } from "zod"

export const GeneralSettingsForm = () => {
  return (
    <FormProvider>
      <Grid container>
        <Grid item md={4}>
          <Paper>General</Paper>
          <Paper>Security</Paper>
          <Paper>Notifications</Paper>
          <Paper>Billing information</Paper>
        </Grid>

        <Grid item md={8}>
          <Paper>
            <Typography>Change your private information</Typography>
            <Typography>
              Please read our terms of use to be informed how we manage your private data.
            </Typography>

            <Typography> Full name </Typography>

            <Typography> Bio </Typography>

            <Typography> Country </Typography>

            <Divider />
          </Paper>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
