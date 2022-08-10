import {Suspense, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import {useMutation, useQuery} from "@blitzjs/rpc"
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
  Stack, TextField,
  Typography,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import UserCard from "app/users/components/UserCard"
import getUsers from "../../app/users/queries/getUsers";

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */


const MembersPage = () => {

  const [nameInput, setNameInput] = useState("")

  const [users] = useQuery(getUsers, {
    name: nameInput || undefined
  })

  return (
    <>
      <Container>
        <Box pt={3}>
          <Typography mb={2} variant="h4" component="h2">
            Members
          </Typography>

          <Box mb={2}>
            <TextField size={"small"} placeholder={"Search by name"} onChange={(evt) => setNameInput(evt.target.value)} value={nameInput} />

          </Box>

          <Grid spacing={3} container>
            {users.map((user) => (
              <Grid item xs={12} md={3}>
                <Card>
                  <UserCard user={user}></UserCard>
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
