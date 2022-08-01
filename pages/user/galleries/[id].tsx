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
  IconButton,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"
import { Delete, Edit, Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import dynamic from "next/dynamic"

import "tui-image-editor/dist/tui-image-editor.css"

let ImageEditor = dynamic(() => import("@toast-ui/react-image-editor"), {
  ssr: false,
})

const EditGallery = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const images = [1, 2, 3, 4]

  const myTheme = {
    "header.display": "none",
  }

  return (
    <>
      <GenericHeader primaryText="Edit gallery" secondaryText="gallery name" />

      <Container>
        <ImageEditor />
        {cards.map((card) => (
          <Box mt={2}>
            <Grid spacing={3} container>
              {images.map((card) => (
                <Grid item xs={12} md={3}>
                  <Card>
                    <Skeleton variant="rectangular" height={118} />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Box my={4} display={"flex"} justifyContent="center">
          <Pagination count={10}></Pagination>
        </Box>
      </Container>
    </>
  )
}

export default EditGallery
