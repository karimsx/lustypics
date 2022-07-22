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
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Link as ReactLink,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import LightGallery from "lightgallery/react"
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
  {
    original: faker.image.abstract(640, 480, true),
    thumbnail: faker.image.abstract(640, 480, true),
  },
]

const Galleries = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const images = [1, 2, 3, 4]
  return (
    <>
      <Container>
        {cards.map((card) => (
          <Box mt={2}>
            <Paper elevation={5}>
              <Box p={2} mb={3}>
                <Typography> Lorem ipsum, dolor sit amet consectetur adipisicing elit </Typography>

                <Grid container>
                  {getImagesMock().map((image) => (
                    <Grid item md={3}>
                      <Link href="/galleries/1" passHref>
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
            </Paper>
          </Box>
        ))}

        <Box my={4} display={"flex"} justifyContent="center">
          <Pagination count={10}></Pagination>
        </Box>
      </Container>
    </>
  )
}

export default Galleries
