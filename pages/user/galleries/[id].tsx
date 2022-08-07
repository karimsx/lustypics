import { ReactNode, useCallback, useRef } from "react"
import { Container, Grid, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import dynamic from "next/dynamic"

import "tui-image-editor/dist/tui-image-editor.css"
import { faker } from "@faker-js/faker"
import Scrollbar from "../../../app/core/components/Scrollbar"
import Dropzone from "react-dropzone"
import { useMutation, useQuery } from "@blitzjs/rpc"
import createFiles from "../../../app/file/mutations/createFiles"
import { fileToBase64 } from "../../../app/core/utils/fileToBase64"
import getFilesByGallery from "../../../app/file/queries/getFilesByGallery"
import { useRouter } from "next/router"

let ImageEditor: any = dynamic<ReactNode>(() => import("@toast-ui/react-image-editor"), {
  ssr: false
})

const EditGallery = () => {

  const router = useRouter()
  const { id } = router.query

  const [files, {refetch: refetchFiles}] = useQuery(getFilesByGallery, {galleryId: parseInt(id as string)})
  const [createFilesMutation] = useMutation(createFiles)

  const getImagesMock = useCallback(() => [
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true)
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true)
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true)
    },
    {
      original: faker.image.abstract(640, 480, true),
      thumbnail: faker.image.abstract(640, 480, true)
    }
  ], [])
  const editorRef = useRef(null)

  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]

  const myTheme = {
    "header.display": "none"
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    for (let i = 0; i < acceptedFiles.length; ++i) {
      await createFilesMutation([{
        galleryIndex: 1,
        data64: await fileToBase64(acceptedFiles[i]),
        name: acceptedFiles[i]?.name || "",
        galleryId: parseInt(id as string)
      }])
    }

    await refetchFiles()


  }, [])

  const handleSelectImage = (evt, image) => {
    evt.stopPropagation()
    evt.preventDefault()

  }

  return (
    <>
      <GenericHeader primaryText="Edit gallery" secondaryText="gallery name" />

      <Container sx={{ mt: 3 }}>
        <ImageEditor
          ref={editorRef}
          includeUI={{
            theme: myTheme,
            menu: ["shape", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "100%",
              height: "800px"
            },
            menuBarPosition: "bottom"
          }}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70
          }}
          usageStatistics={true}
        />

        <Paper sx={{ my: 3 }} elevation={5}>
          <Scrollbar sx={{ mt: 4, maxHeight: 600 }}>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>

                    <Box mt={2}>
                      <Box p={2} mb={3}>
                        <Grid container>
                          {files.map((file) => (
                            <Grid key={file.id} item md={3}>
                              <Box
                                onClick={(evt) => handleSelectImage(evt, null)}
                                sx={{
                                  backgroundImage: `url(${file.signedUrl})`,
                                  backgroundOrigin: "center",
                                  backgroundPosition: "center",
                                  height: "300px",
                                  mr: 2,
                                  mb: 2,
                                  cursor: "pointer"

                                }}
                              />
                            </Grid>
                          ))}
                        </Grid>

                      </Box>
                    </Box>
                </div>
              )}


            </Dropzone>

          </Scrollbar>

        </Paper>
      </Container>
    </>
  )
}

export default EditGallery
