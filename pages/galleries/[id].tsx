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
  Paper,
  Skeleton,
  Stack,
  Typography,
  Link as ReactLink,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import { faker } from "@faker-js/faker"

const Home = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
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

  return (
    <>
      <Container>
        <Box pt={3}>
          <Typography mb={2} variant="h4" component="h2">
            Latest galleries
          </Typography>

          {cards.map((el) => (
            <Grid mb={4} container>
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
          ))}
        </Box>
      </Container>
    </>
  )
}

export default Home
