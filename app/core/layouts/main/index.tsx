import { ReactNode } from "react"
// next
import { useRouter } from "next/router"
// @mui
import { Box, Link, Container, Typography, Stack } from "@mui/material"
// components
import Logo from "../../components/Logo"
//
import MainFooter from "./MainFooter"
import MainHeader from "./MainHeader"

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter()
  const isHome = pathname === "/"

  return (
    <Stack sx={{ minHeight: 1 }}>
      <Box sx={{ backgroundColor: "background.default" }}>{children}</Box>

      <Box sx={{ mt: 3, flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  )
}
