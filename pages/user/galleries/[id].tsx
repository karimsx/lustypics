import { ReactNode, useCallback, useRef } from "react"
import { Container, Grid, MenuItem, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { GenericHeader } from "app/core/components/GenericHeader"
import dynamic from "next/dynamic"

import "tui-image-editor/dist/tui-image-editor.css"
import Scrollbar from "../../../app/core/components/Scrollbar"
import Dropzone from "react-dropzone"
import { useMutation, useQuery } from "@blitzjs/rpc"
import createFiles from "../../../app/file/mutations/createFiles"
import { fileToBase64 } from "../../../app/core/utils/fileToBase64"
import getFilesByGallery from "../../../app/file/queries/getFilesByGallery"
import { useRouter } from "next/router"
import { SelectableImage } from "../../../app/galleries/components/SelectableImage"
import Form from "../../../app/core/components/Form"
import { RHFSwitch, RHFTextField } from "../../../app/core/components/hook-form"
import FormLabel from "../../../app/core/components/hook-form/FormLabel"
import getTags from "../../../app/galleries/queries/tags/getTags"
import { RHFAutoComplete } from "../../../app/core/components/hook-form/RHFAutoComplete"
import getGallery from "../../../app/galleries/queries/getGallery"
import updateGallery from "../../../app/galleries/mutations/updateGallery"
import { useSnackbar } from "notistack"

let ImageEditor: any = dynamic<ReactNode>(() => import("@toast-ui/react-image-editor"), {
  ssr: false,
})

const EditGallery = () => {
  const router = useRouter()
  const { id } = router.query
  const { enqueueSnackbar } = useSnackbar()

  const [gallery] = useQuery(getGallery, {
    id: parseInt(id as string, 10),
  })
  const [tags] = useQuery(getTags, {})

  const [files, { refetch: refetchFiles }] = useQuery(getFilesByGallery, {
    galleryId: parseInt(id as string),
  })

  const [createFilesMutation] = useMutation(createFiles)
  const [updateGalleryMutation] = useMutation(updateGallery)

  const editorRef = useRef(null)

  const myTheme = {
    "header.display": "none",
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (let i = 0; i < acceptedFiles.length; ++i) {
      await createFilesMutation([
        {
          galleryIndex: 1,
          data64: await fileToBase64(acceptedFiles[i]),
          name: acceptedFiles[i]?.name || "",
          galleryId: parseInt(id as string),
        },
      ])
    }

    await refetchFiles()
  }, [])

  const handleSelectImage = (evt, image) => {
    evt.stopPropagation()
    evt.preventDefault()
  }

  return (
    <>
      <GenericHeader primaryText="Edit gallery" />

      <Container sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }} elevation={2}>
          <Form
            submitText={"Save"}
            initialValues={{
              name: gallery?.name || "",
              description: gallery?.description || "",
              tags: gallery?.tags,
              isPublic: gallery?.isPublic,
            }}
            onSubmit={async (values) => {
              if (values.isPublic && !values.name) {
                return {
                  FORM_ERROR: "Can't make a gallery public whithout a title",
                }
              }

              await updateGalleryMutation({
                ...values,
                id: parseInt(id as string, 10),
                tags: values.tags.map((tag) => tag.id),
              })
              enqueueSnackbar("Gallery updated successfully")
            }}
          >
            <FormLabel content={"Gallery title"} />
            <RHFTextField name={"name"} label={"Gallery title"} />

            <FormLabel content={"Description"} />
            <RHFTextField multiline rows={8} name={"description"} label={"Gallery title"} />

            <FormLabel content={"Tags"} />
            <RHFAutoComplete
              multiple={true}
              name={"tags"}
              options={tags}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              includeInputInList={false}
              getOptionLabel={(tag) => tag.name}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.name}>
                  {tag.name}
                </MenuItem>
              ))}
            </RHFAutoComplete>

            <FormLabel content={"Public status"} />
            <Box mb={2}>
              {" "}
              <RHFSwitch name="isPublic" label="Public" />
            </Box>
          </Form>
        </Paper>

        {/*<ImageEditor*/}
        {/*  ref={editorRef}*/}
        {/*  includeUI={{*/}
        {/*    theme: myTheme,*/}
        {/*    menu: ["shape", "filter"],*/}
        {/*    initMenu: "filter",*/}
        {/*    uiSize: {*/}
        {/*      width: "100%",*/}
        {/*      height: "800px"*/}
        {/*    },*/}
        {/*    menuBarPosition: "bottom"*/}
        {/*  }}*/}
        {/*  selectionStyle={{*/}
        {/*    cornerSize: 20,*/}
        {/*    rotatingPointOffset: 70*/}
        {/*  }}*/}
        {/*  usageStatistics={true}*/}
        {/*/>*/}

        <Paper sx={{ my: 3, px: 2 }} elevation={8}>
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
                            <SelectableImage
                              url={file.signedUrl}
                              handleSelectImage={handleSelectImage}
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
