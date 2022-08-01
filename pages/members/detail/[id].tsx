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
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import UserCard from "app/users/components/UserCard"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const MembersPage = () => {
  const cards = [
    0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ]

  return (
    <>
      <Container>
        <Box pt={3}>
          <Typography mb={2} variant="h4" component="h2">
            Members
          </Typography>

          <Grid spacing={3} container>
            {cards.map((card) => (
              <Grid item xs={12} md={3}>
                <Card>
                  <UserCard user={{ id: 1, name: "test" }}></UserCard>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default MembersPage
