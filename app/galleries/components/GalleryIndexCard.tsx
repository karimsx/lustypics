import ImageGallery from "react-image-gallery"
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
import { Gallery } from "@prisma/client"

export interface GalleryIndexCardProps {
  gallery: Gallery
  [k: string]: unknown
}

export const GalleryIndexCard = ({ gallery, ...others }) => {
  const router = useRouter()

  return (
    <Card {...others}>
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
        items={gallery?.files
          ?.slice(0, 5)
          ?.map((file) => ({ original: file.signedUrl, thumbnail: file.signedUrl }))}
      />
      <CardContent>
        <Link href={`/galleries/${gallery.id}`} passHref>
          <ReactLink sx={{ textDecoration: "none", color: "common.black" }}>
            <Typography>{gallery.name}</Typography>
          </ReactLink>
        </Link>

        <Stack mt={3} direction={"row"} flexWrap="wrap">
          <Box mx={1} my={1}>
            {gallery.tags.map((tag) => (
              <Chip
                key={tag.id}
                sx={{ mr: 1, mb: 1 }}
                size="small"
                onClick={async () => {
                  await router.push(`/galleries`, {
                    query: {
                      tags: tag.id,
                    },
                  })
                }}
                label={tag.name}
              />
            ))}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default GalleryIndexCard
