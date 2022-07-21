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
  useTheme,
} from "@mui/material"
import { Delete, Edit, Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const MyGalleries = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const images = [1, 2, 3, 4]
  const theme = useTheme()
  return (
    <>
      <GenericHeader
        primaryText="My galleries"
        secondaryText="view list of all my uploaded galleries"
      />
      <Container>
        {cards.map((card) => (
          <Box mt={2}>
            <Typography mb={1}>
              {" "}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit
            </Typography>
            <Grid spacing={3} container>
              {images.map((card) => (
                <Grid item xs={12} md={3}>
                  <Card>
                    <Skeleton variant="rectangular" height={118} />
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent={"flex-end"}>
              <IconButton color="error">
                <Delete />
              </IconButton>
              <Link href="/user/galleries/1">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Link>
            </Box>
          </Box>
        ))}

        <Box my={4} display={"flex"} justifyContent="center">
          <Pagination count={10}></Pagination>
        </Box>
      </Container>
    </>
  )
}

export default MyGalleries
