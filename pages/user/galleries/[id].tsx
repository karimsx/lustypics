import { ReactNode, useCallback, useRef } from "react"
import Link from "next/link"
import { Container, Grid, Link as ReactLink, Pagination, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import dynamic from "next/dynamic"

import "tui-image-editor/dist/tui-image-editor.css"
import { faker } from "@faker-js/faker"
import Scrollbar from "../../../app/core/components/Scrollbar"
import Dropzone from "react-dropzone"

let ImageEditor: any = dynamic<ReactNode>(() => import("@toast-ui/react-image-editor"), {
  ssr: false
})

const EditGallery = () => {
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
  const images = [1, 2, 3, 4]

  const myTheme = {
    "header.display": "none"
  }

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  const handleSelectImage = (evt, image) => {
    evt.stopPropagation();
    evt.preventDefault();
  }

  return (
    <>
      <GenericHeader primaryText="Edit gallery" secondaryText="gallery name" />

      <Container>
        <ImageEditor
          ref={editorRef}
          includeUI={{
            theme: myTheme,
            menu: ["shape", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "1000px",
              height: "700px"
            },
            menuBarPosition: "bottom"
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70
          }}
          usageStatistics={true}
        />

        <Paper sx={{my: 3}} elevation={5}>
          <Scrollbar sx={{ mt: 4, maxHeight: 600 }}>
            <Dropzone onDrop={onDrop}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag and drop some files here, or click to select files</p>

                  {cards.map((card) => (
                    <Box mt={2}>
                      <Box p={2} mb={3}>
                        <Grid container>
                          {getImagesMock().map((image) => (
                            <Grid item md={3}>
                                  <Box
                                    onClick={(evt) => handleSelectImage(evt, image.original)}
                                    sx={{
                                      backgroundImage: `url(${image.original})`,
                                      backgroundOrigin: "center",
                                      backgroundPosition: "center",
                                      height: "300px",
                                      mr: 2,
                                      cursor: "pointer"

                                    }}
                                  />
                            </Grid>
                          ))}
                        </Grid>

                      </Box>
                    </Box>
                  ))}
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
