import {Suspense, useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import {useMutation, useQuery} from "@blitzjs/rpc"
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
import getGalleries from "../../app/galleries/queries/getGalleries";
import {GalleryOverviewCard} from "../../app/galleries/components/GalleryOverviewCard";

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


  const [pagination, setPagination] = useState({
      page: 1,
      perPage: 10,
      totalPages: 0
    }
  )

  const [galleries, { refetch: refetchGalleries }] = useQuery(getGalleries, {
    page: pagination.page,
    perPage: pagination.perPage,
  })

  useEffect(() => {
    setPagination((oldValue) => ({
      ...oldValue,
      totalPages: galleries.totalPage
    }))
  }, [galleries?.totalPage])


  const handlePageChange = (evt, page: number) => {
    setPagination((oldValue) => ({
      ...oldValue,
      page
    }))
  }
  return (
    <>
      <Container>
        {galleries?.items?.map((gallery) => (
            <GalleryOverviewCard gallery={gallery} />
        ))}

        <Box my={4} display={"flex"} justifyContent="center">
          <Pagination onChange={handlePageChange} count={pagination.totalPages} page={pagination.page}></Pagination>
        </Box>
      </Container>
    </>
  )
}

export default Galleries
