import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { BlitzPage, Routes } from "@blitzjs/next"
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
  Rating,
  Chip,
  styled,
} from "@mui/material"
import { Title } from "@mui/icons-material"
import PrimaryAppBar from "app/core/components/AppBar"
import { Box } from "@mui/system"
import { faker } from "@faker-js/faker"
import getGallery from "app/galleries/queries/getGallery"
import { useRouter } from "next/router"
import MyAvatar from "app/core/components/MyAvatar"
import LightGallery from "lightgallery/react"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import ImageGallery from "react-image-gallery"
import { GalleryItem } from "lightgallery/lg-utils"
import FullScreenSwiper from "app/core/components/FullScreenSwiper"
import { SwiperSlide } from "swiper/react"

const StyledImage = styled("img")(({ theme }) => ({
  borderRadius: 5,
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  "&:hover": {
    boxShadow: theme.shadows[5],
  },
}))

const GalleryDetailPage: BlitzPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [gallery] = useQuery(getGallery, {
    id: parseInt(id as string),
  })

  const [viewerHidden, setViewerHidden] = useState(true)
  const [viewerIndex, setViewerIndex] = useState(0)

  const openViewer = (idx: number) => {
    setViewerIndex(idx)
    setViewerHidden(false)
  }

  return (
    <>
      <Container>
        <Box pt={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Box display="flex" alignItems={"center"}>
              <Box>
                <MyAvatar />
                {gallery.owner?.name}
              </Box>
              <Box ml={4}>
                <Typography variant="h5"> {gallery.name}</Typography>
                <Typography variant={"caption"} color={"grey.600"}>
                  {" "}
                  {gallery.description}
                </Typography>{" "}
                <Box>
                  {gallery?.tags?.map((tag) => (
                    <Box display={"inline-block"} mr={1}>
                      <Chip size={"small"} label={tag.name} />
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box ml={"auto"} display={"flex"} alignItems={"center"} pt={1}>
                <Rating name="simple-controlled" value={4} readOnly={true} />
              </Box>
            </Box>
          </Paper>
          <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
            <Grid spacing={4} container alignItems={"center"}>
              {gallery?.files?.map((file, idx) => (
                <Grid key={file.id} item md={3}>
                  <ReactLink onClick={() => openViewer(idx)} href="#">
                    <StyledImage src={file["signedUrl"]} />
                  </ReactLink>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        <FullScreenSwiper
          currentIndex={viewerIndex}
          onClose={() => setViewerHidden(true)}
          hidden={viewerHidden}
        >
          {" "}
          {gallery?.files?.map((file) => (
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              {" "}
              <StyledImage src={file["signedUrl"]} />
            </SwiperSlide>
          ))}
        </FullScreenSwiper>
      </Container>
    </>
  )
}

export default GalleryDetailPage
