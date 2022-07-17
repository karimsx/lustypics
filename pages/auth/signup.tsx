import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Routes } from "@blitzjs/next"
import { LoginForm } from "app/auth/components/LoginForm"
import { Avatar, Box, Container, CssBaseline, Paper, Typography } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Copyright } from "@mui/icons-material"

const SignupPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: {
              sx: 8,
              md: 30,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Paper
            sx={{
              py: 4,
              px: 5,
              minWidth: 300,
              width: {
                sx: 300,
                md: 600,
              },
            }}
          >
            <SignupForm onSuccess={() => router.push(Routes.MembersPage())} />
          </Paper>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Layout>
  )
}

export default SignupPage
