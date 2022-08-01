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
import UserCard from "app/users/components/UserCard"
import ImageGallery from "react-image-gallery"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { faker } from "@faker-js/faker"

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

const MembersPage = () => {
  const cards = [0, 1, 2, 4, 5, 6]
  const images = [1, 2, 3, 4]

  return (
    <>
      <Container>
        <Box pt={3}>
          <Grid spacing={2} container>
            <Grid item md={3}>
              <Card>
                <UserCard user={{ id: 1, name: "test" }}></UserCard>
              </Card>
            </Grid>

            <Grid item md={9}>
              <Typography mb={2} variant="h4" component="h2">
                Latest galleries
              </Typography>

              <Grid spacing={3} container>
                {cards.map((card) => (
                  <Grid item xs={12} md={4}>
                    <Card>
                      <ImageGallery
                        showThumbnails={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onClick={() => {
                          console.log("clicked")
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
                              <IconButton
                                onClick={onClick}
                                disabled={disabled}
                                sx={{ color: "white" }}
                              >
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
                              <IconButton
                                onClick={onClick}
                                disabled={disabled}
                                sx={{ color: "white" }}
                              >
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
                            <Typography>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem dolo
                            </Typography>
                          </ReactLink>
                        </Link>

                        <Stack mt={3} direction={"row"} flexWrap="wrap">
                          {cards.slice(0, 6).map((card) => (
                            <Box mx={1} my={1}>
                              {" "}
                              <Chip onClick={() => {}} label="testdz" />
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Stack mt={2} alignItems={"flex-end"}>
                <Button variant="contained"> All galleries</Button>
              </Stack>

              <Typography mb={2} variant="h4" component="h2">
                Most Viewed galleries
              </Typography>

              <Grid spacing={3} container>
                {cards.map((card) => (
                  <Grid item xs={12} md={4}>
                    <Card>
                      <ImageGallery
                        showThumbnails={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onClick={() => {
                          console.log("clicked")
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
                              <IconButton
                                onClick={onClick}
                                disabled={disabled}
                                sx={{ color: "white" }}
                              >
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
                              <IconButton
                                onClick={onClick}
                                disabled={disabled}
                                sx={{ color: "white" }}
                              >
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
                            <Typography>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem dolo
                            </Typography>
                          </ReactLink>
                        </Link>

                        <Stack mt={3} direction={"row"} flexWrap="wrap">
                          {cards.slice(0, 6).map((card) => (
                            <Box mx={1} my={1}>
                              {" "}
                              <Chip onClick={() => {}} label="testdz" />
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Stack mt={2} alignItems={"flex-end"}>
                <Button variant="contained"> All galleries</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default MembersPage
