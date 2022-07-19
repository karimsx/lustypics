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

export const ChangePasswordForm = () => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        Change your password
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form submitText="Save" onSubmit={() => {}}>
        <Typography variant="subtitle2"> Old password </Typography>
        <RHFTextField hidden name="fullname" />

        <Typography variant="subtitle2"> New password </Typography>
        <RHFTextField hidden rows={6} multiline name="fullname" />

        <Typography variant="subtitle2"> New password confirm </Typography>
        <RHFTextField hidden name="fullname" />
      </Form>

      <Divider />
    </Paper>
  )
}
