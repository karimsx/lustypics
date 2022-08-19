import { Suspense, useEffect, useState } from "react"
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
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Link as ReactLink,
  TextField,
  MenuItem,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import LightGallery from "lightgallery/react"
import { faker } from "@faker-js/faker"
import getGalleries from "../../app/galleries/queries/getGalleries"
import { GalleryOverviewCard } from "../../app/galleries/components/GalleryOverviewCard"
import { RHFAutoComplete } from "app/core/components/hook-form/RHFAutoComplete"
import getTags from "app/galleries/queries/tags/getTags"
import Form from "app/core/components/Form"
import { RHFSelect, RHFTextField } from "app/core/components/hook-form"
import { GalleryFilterForm } from "app/galleries/components/GalleryFilterForm"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Galleries = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalPages: 0,
  })

  const [filter, setFilter] = useState<any>({
    orderBy: "latest",
    term: "",
    tags: [],
  })

  const [galleries, { refetch: refetchGalleries }] = useQuery(getGalleries, {
    page: pagination.page,
    perPage: pagination.perPage,
    ...filter,
  })

  useEffect(() => {
    setPagination((oldValue) => ({
      ...oldValue,
      totalPages: galleries.totalPage,
    }))
  }, [galleries?.totalPage])

  const handlePageChange = (evt, page: number) => {
    setPagination((oldValue) => ({
      ...oldValue,
      page,
    }))
  }

  const handleFiltersChange = (newFilters) => {
    setFilter(newFilters)
  }

  return (
    <>
      <Container>
        <GalleryFilterForm onChange={handleFiltersChange} />
        {galleries?.items?.map((gallery) => (
          <GalleryOverviewCard gallery={gallery} />
        ))}

        <Box my={4} display={"flex"} justifyContent="center">
          <Pagination
            onChange={handlePageChange}
            count={pagination.totalPages}
            page={pagination.page}
          ></Pagination>
        </Box>
      </Container>
    </>
  )
}

export default Galleries
