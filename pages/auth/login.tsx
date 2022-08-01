import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import { Avatar, Box, Container, CssBaseline, Paper, Typography } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Copyright } from "@mui/icons-material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const LoginPage = () => {
  const router = useRouter()
  return (
    <Layout title="Log In">
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
            Sign in
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
            <LoginForm
              onSuccess={(_user) => {
                const next = router.query.next
                  ? decodeURIComponent(router.query.next as string)
                  : "/"
                return router.push(next)
              }}
            />
          </Paper>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Layout>
  )
}

export default LoginPage
