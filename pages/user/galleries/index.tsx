import { useEffect, useState } from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@blitzjs/rpc"
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Link as ReactLink,
  Pagination,
  Paper,
  Typography,
} from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import createGallery from "app/galleries/mutations/createGallery"

import { useDialog } from "../../../app/core/contexts/DialogContext"
import getGalleries from "app/galleries/queries/getGalleries"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import deleteGallery from "../../../app/galleries/mutations/deleteGallery"

import { Gallery } from "db"

const MyGalleries = () => {
  const session = useSession()
  const router = useRouter()

  const [showDialog, closeDialog] = useDialog()
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    totalPages: 0,
  })

  const [galleries, { refetch: refetchGalleries }] = useQuery(getGalleries, {
    page: pagination.page,
    perPage: pagination.perPage,
    ownerId: session.userId as number,
  })
  const [createGalleryMutation] = useMutation(createGallery)
  const [deleteGalleryMutation] = useMutation(deleteGallery)

  const handleNewGallery = async () => {
    const gallery = await createGalleryMutation({})
    await router.push("/user/galleries/" + gallery.id)
  }

  const handlePageChange = (evt, page: number) => {
    setPagination((oldValue) => ({
      ...oldValue,
      page,
    }))
  }

  const handleDeleteGallery = (gallery: Gallery) => {
    showDialog({
      children: (
        <>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure you want to delete the gallery <b>{gallery.name}</b>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color={"warning"}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                await deleteGalleryMutation(gallery.id)
                await refetchGalleries()
                closeDialog()
              }}
              color={"error"}
              variant={"contained"}
            >
              Delete
            </Button>
          </DialogActions>
        </>
      ),
    })
  }

  useEffect(() => {
    setPagination((oldValue) => ({
      ...oldValue,
      totalPages: galleries.totalPage,
    }))
  }, [galleries?.totalPage])

  return (
    <>
      <GenericHeader
        primaryText="My galleries"
        secondaryText="view list of all my uploaded galleries"
      />
      <Container>
        <Box display="flex" mt={2} justifyContent={"flex-end"}>
          <Button onClick={handleNewGallery} variant="contained">
            New gallery
          </Button>
        </Box>

        {galleries.items.map((gallery) => (
          <Box mt={2}>
            <Box mt={2}>
              <Paper elevation={5}>
                <Box p={2} mb={3}>
                  <Typography> {gallery.name}</Typography>

                  <Grid container>
                    {gallery.files?.slice(0, 4).map((file) => (
                      <Grid item md={3}>
                        <Link href={`/user/galleries/${gallery.id}`} passHref>
                          <ReactLink>
                            <Box
                              sx={{
                                backgroundImage: `url(${file.signedUrl})`,
                                backgroundOrigin: "center",
                                backgroundPosition: "center",
                                height: "300px",
                                mr: 2,
                                borderRadius: "10px",
                              }}
                            />
                          </ReactLink>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                <Box display="flex" justifyContent={"flex-end"}>
                  <IconButton onClick={() => handleDeleteGallery(gallery)} color="error">
                    <Delete />
                  </IconButton>
                  <Link href={`/user/galleries/${gallery.id}`}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                </Box>
              </Paper>
            </Box>
          </Box>
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

export default MyGalleries
