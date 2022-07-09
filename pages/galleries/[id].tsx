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

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </Button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]

  return (
    <>
      <Container>
        <Box pt={3}>
          <Typography mb={2} variant="h4" component="h2">
            Latest galleries
          </Typography>

          <Grid spacing={3} container>
            {cards.map((card) => (
              <Grid item xs={12} md={3}>
                <Card>
                  <Skeleton variant="rectangular" height={118} />
                </Card>
              </Grid>
            ))}
          </Grid>

          <Stack mt={2} alignItems={"flex-end"}>
            <Button variant="contained"> See More</Button>
          </Stack>
        </Box>

        <Box pt={5}>
          <Typography mb={2} variant="h4" component="h2">
            Most viewed galleries
          </Typography>

          <Grid spacing={3} container>
            {cards.map((card) => (
              <Grid item xs={12} md={3}>
                <Card>
                  <Skeleton variant="rectangular" height={118} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Stack mt={2} alignItems={"flex-end"}>
          <Button variant="contained"> See More</Button>
        </Stack>
      </Container>
    </>
  )
}

export default Home
