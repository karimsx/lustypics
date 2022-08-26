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
  Paper,
  Skeleton,
  Stack,
  Link as ReactLink,
  Typography,
  Chip,
  IconButton,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import { faker } from "@faker-js/faker"
import getCurrentUser from "app/users/queries/getCurrentUser"
import getGalleries from "app/galleries/queries/getGalleries"
import { useRouter } from "next/router"
import { Masonry } from "@mui/lab"
import GalleryIndexCard from "app/galleries/components/GalleryIndexCard"

const Home = () => {
  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const router = useRouter()

  const [latestGalleries] = useQuery(getGalleries, {
    page: 1,
    perPage: 15,
    orderBy: "latest",
    isPublic: true,
  })

  const [mostViewedGalleries] = useQuery(getGalleries, {
    page: 1,
    perPage: 15,
    orderBy: "most_viewed",
    isPublic: true,
  })

  return (
    <Container>
      <Box pt={3}>
        <Typography mb={2} variant="h4" component="h2">
          Latest galleries
        </Typography>

        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
          {latestGalleries.items.map((gallery) => (
            <GalleryIndexCard key={gallery.id} gallery={gallery} />
          ))}
        </Masonry>

        <Stack mt={2} alignItems={"flex-end"}>
          <Link href="/galleries?orderBy=latest">
            <Button variant="contained"> See More</Button>
          </Link>
        </Stack>
      </Box>

      <Box pt={5}>
        <Typography mb={2} variant="h4" component="h2">
          Most viewed galleries
        </Typography>

        <Masonry columns={4} spacing={2}>
          {mostViewedGalleries.items.map((gallery) => (
            <GalleryIndexCard key={gallery.id} gallery={gallery} />
          ))}
        </Masonry>
      </Box>

      <Stack mt={2} alignItems={"flex-end"}>
        <Link href="/galleries?orderBy=most_viewed">
          <Button variant="contained"> See More</Button>
        </Link>
      </Stack>
    </Container>
  )
}

export default Home
