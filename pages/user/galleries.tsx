import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation, useQuery } from "@blitzjs/rpc"
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
  Link as ReactLink,
} from "@mui/material"
import { Delete, Edit, Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import { faker } from "@faker-js/faker"
import createGallery from "app/galleries/mutations/createGallery"

import { useDialog } from "../../app/core/contexts/DialogContext"
import getGalleries from "app/galleries/queries/getGalleries"
import { useSession } from "@blitzjs/auth"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const MyGalleries = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const images = [1, 2, 3, 4]
  const theme = useTheme()
  const session = useSession()

  const [galleries] = useQuery(getGalleries, {
    page: 0,
    perPage: 10,
    ownerId: session.userId as number,
  })
  const [createGalleryMutation] = useMutation(createGallery)
  const [createDialog] = useDialog()
  const getImagesMock = () => [
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true),
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true),
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true),
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true),
    },
  ]

  const handleNewGallery = async () => {
    await createGalleryMutation({})
  }

  return (
    <>
      <GenericHeader
        primaryText="My galleries"
        secondaryText="view list of all my uploaded galleries"
      />
      <Container>
        <Box display="flex" mt={2} justifyContent={"flex-end"}>
          <Button onClick={handleNewGallery} variant="contained">
            New gallery
          </Button>
        </Box>
        {galleries.map((gallery) => (
          <Box mt={2}>
            <Box mt={2}>
              <Paper elevation={5}>
                <Box p={2} mb={3}>
                  <Typography> {gallery.name}</Typography>

                  <Grid container>
                    {getImagesMock().map((image) => (
                      <Grid item md={3}>
                        <Link href={`/user/galleries/${gallery.id}`} passHref>
                          <ReactLink>
                            <Box
                              sx={{
                                backgroundImage: `url(${image.original})`,
                                backgroundOrigin: "center",
                                backgroundPosition: "center",
                                height: "300px",
                                mr: 2,
                              }}
                            />
                          </ReactLink>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
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
              </Paper>
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
