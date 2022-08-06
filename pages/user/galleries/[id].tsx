import { ReactNode } from "react"
import Link from "next/link"
import { Container, Grid, Link as ReactLink, Pagination, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import dynamic from "next/dynamic"

import "tui-image-editor/dist/tui-image-editor.css"
import { faker } from "@faker-js/faker"
import Scrollbar from "../../../app/core/components/Scrollbar"

let ImageEditor: any = dynamic<ReactNode>(() => import("@toast-ui/react-image-editor"), {
  ssr: false
})

const EditGallery = () => {
  const getImagesMock = () => [
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
  ]

  const cards = [0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8]
  const images = [1, 2, 3, 4]

  const myTheme = {
    "header.display": "none"
  }

  return (
    <>
      <GenericHeader primaryText="Edit gallery" secondaryText="gallery name" />

      <Container>
        <ImageEditor
          includeUI={{
            loadImage: {
              path: "img/sampleImage.jpg",
              name: "SampleImage"
            },
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

        <Paper elevation={5}>
          <Scrollbar sx={{ mt: 4, maxHeight: 600 }}>
            {cards.map((card) => (
              <Box mt={2}>
                <Box p={2} mb={3}>
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
                                mr: 2
                              }}
                            />
                          </ReactLink>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>

                </Box>
              </Box>
            ))}
          </Scrollbar>

        </Paper>


      </Container>
    </>
  )
}

export default EditGallery
