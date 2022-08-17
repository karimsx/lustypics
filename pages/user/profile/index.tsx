import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@blitzjs/rpc"
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link as ReactLink,
  Stack,
  Typography
} from "@mui/material"
import { Box } from "@mui/system"
import UserCard from "app/users/components/UserCard"
import ImageGallery from "react-image-gallery"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { faker } from "@faker-js/faker"
import getGalleries from "../../../app/galleries/queries/getGalleries"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import {useCurrentUser} from "../../../app/core/hooks/useCurrentUser";


const UserProfilePage = () => {
  const cards = [0, 1, 2, 4, 5, 6]
  const session = useSession()
  const router = useRouter()
  const user = useCurrentUser()

  const [pagination, setPagination] = useState({
      page: 1,
      perPage: 8,
      totalPages: 0
    }
  )

  const [galleries, { refetch: refetchGalleries }] = useQuery(getGalleries, {
    page: pagination.page,
    perPage: pagination.perPage,
    ownerId: session.userId as number
  })

  return (
    <>
      <Container>
        <Box pt={3}>
          <Grid spacing={4} container>
            <Grid item md={4}>
              <Card>
                <UserCard user={user} showBio={true}></UserCard>
              </Card>
            </Grid>

            <Grid item md={8}>

              <Box>
                <Typography mb={2} variant="h4" component="h2">
                  Latest galleries
                </Typography>

                <Grid spacing={3} container>
                  {galleries.items.map((gallery) => (
                    <Grid item xs={12} md={4}>
                      <Card>
                        <ImageGallery
                          showThumbnails={false}
                          showPlayButton={false}
                          showFullscreenButton={false}
                          onClick={async () => {
                            await router.push(`/galleries/${gallery.id}`)
                          }}
                          renderLeftNav={(onClick, disabled) => {
                            return (
                              <Box
                                sx={{
                                  position: "absolute",
                                  zIndex: 4,
                                  top: "calc(50% - 18px)"
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
                                  right: "10px"
                                }}
                              >
                                <IconButton onClick={onClick} disabled={disabled} sx={{ color: "white" }}>
                                  <ChevronRightIcon></ChevronRightIcon>
                                </IconButton>
                              </Box>
                            )
                          }}
                          items={gallery?.files?.slice(0, 5)?.map(file => ({
                            original: file.signedUrl,
                            thumbnail: file.signedUrl
                          }))}
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
                                <Chip onClick={() => {
                                }} label="testdz" />
                              </Box>
                            ))}
                          </Stack>
                        </CardContent>
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
                  {galleries.items.map((gallery) => (
                    <Grid item xs={12} md={4}>
                      <Card>
                        <ImageGallery
                          showThumbnails={false}
                          showPlayButton={false}
                          showFullscreenButton={false}
                          onClick={async () => {
                            await router.push(`/galleries/${gallery.id}`)
                          }}
                          renderLeftNav={(onClick, disabled) => {
                            return (
                              <Box
                                sx={{
                                  position: "absolute",
                                  zIndex: 4,
                                  top: "calc(50% - 18px)"
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
                                  right: "10px"
                                }}
                              >
                                <IconButton onClick={onClick} disabled={disabled} sx={{ color: "white" }}>
                                  <ChevronRightIcon></ChevronRightIcon>
                                </IconButton>
                              </Box>
                            )
                          }}
                          items={gallery?.files?.slice(0, 5)?.map(file => ({
                            original: file.signedUrl,
                            thumbnail: file.signedUrl
                          }))}
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
                                <Chip onClick={() => {
                                }} label="testdz" />
                              </Box>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box display={"flex"} mt={2} justifyContent={"flex-end"}>
                  <Button variant="contained"> All galleries</Button>
                </Box>
              </Box>
            </Grid>


          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default UserProfilePage
