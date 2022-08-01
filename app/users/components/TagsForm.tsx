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

export const TagsForm = () => {
  const cards = [
    0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ]

  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        List of my preferred tags
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Form submitText="Save" onSubmit={async (values) => {}}>
        <Typography variant="subtitle2"> Standard </Typography>
        <Box display="flex" flexWrap={"wrap"}>
          {cards.map((card) => (
            <Box mr={1} mb={1}>
              <Chip label={"Lorem"} />
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2"> Fetish </Typography>
        <Box display="flex" flexWrap={"wrap"}>
          {cards.map((card) => (
            <Box mr={1} mb={1}>
              <Chip label={"Lorem"} />
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2"> Weird </Typography>
        <Box display="flex" flexWrap={"wrap"}>
          {cards.map((card) => (
            <Box mr={1} mb={1}>
              <Chip label={"Lorem"} />
            </Box>
          ))}
        </Box>
      </Form>

      <Divider />
    </Paper>
  )
}
