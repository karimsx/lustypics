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
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Link as ReactLink,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import ImageGallery from "react-image-gallery"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { faker } from "@faker-js/faker"
import { useRouter } from "next/router"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
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
]

const CategoriesPage = () => {
  const cards = [
    0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ]

  const router = useRouter()
  return (
    <>
      <Container>
        <Box pt={3}>
          <Typography mb={2} variant="h4" component="h2">
            Categories
          </Typography>

          <Grid spacing={3} container>
            {cards.map((card) => (
              <Grid item xs={12} md={3}>
                <Card>
                  <ImageGallery
                    showThumbnails={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    onClick={async () => {
                      console.log("clicked")
                      await router.push("/galleries")
                    }}
                    renderLeftNav={(onClick, disabled) => {
                      return (
                        <Box
                          sx={{
                            position: "absolute",
                            zIndex: 4,
                            top: "calc(50% - 18px)",
                          }}
                        >
                          <IconButton onClick={onClick} disabled={disabled} sx={{ color: "white" }}>
                            <ChevronLeftIcon></ChevronLeftIcon>
                          </IconButton>
                        </Box>
                      )
                    }}
                    renderRightNav={(onClick, disabled) => {
                      return (
                        <Box
                          sx={{
                            position: "absolute",
                            zIndex: 4,
                            top: "calc(50% - 18px)",
                            right: "10px",
                          }}
                        >
                          <IconButton onClick={onClick} disabled={disabled} sx={{ color: "white" }}>
                            <ChevronRightIcon></ChevronRightIcon>
                          </IconButton>
                        </Box>
                      )
                    }}
                    items={getImagesMock()}
                  />
                  <CardContent>
                    <Link href="/galleries" passHref>
                      <ReactLink sx={{ textDecoration: "none", color: "common.black" }}>
                        <Typography>Lorem ipsum</Typography>
                      </ReactLink>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography mt={4} mb={2} variant="h4" component="h2">
            Other tags
          </Typography>

          <Box display="flex" flexWrap={"wrap"}>
            {cards.map((card) => (
              <Box mr={2} mt={2}>
                <Chip
                  onClick={async () => router.push("/galleries")}
                  label={faker.internet.domainWord()}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default CategoriesPage
