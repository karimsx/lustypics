import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { RHFTextField } from "app/core/components/hook-form"
import { Box, Button, Divider, Typography } from "@mui/material"
import { z } from "zod"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div>
      <h1>Login</h1>

      <Form
        submitElement={
          <Button fullWidth variant="contained" type="submit">
            Login
          </Button>
        }
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <RHFTextField name="email" label="Email" placeholder="Email" />
        <RHFTextField name="password" label="Password" placeholder="Password" type="password" />
        <Box display="flex">
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>

          <Box ml={"auto"}>
            <Link href={Routes.SignupPage()}>
              <a>Sign Up</a>
            </Link>
          </Box>
        </Box>
      </Form>
    </div>
  )
}

export default LoginForm
