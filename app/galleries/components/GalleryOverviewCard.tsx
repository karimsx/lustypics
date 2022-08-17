import { Box } from "@mui/system"
import { Gallery, File, Tags } from "db"
import {
  Button,
  Chip,
  Divider,
  Grid,
  Link as ReactLink,
  Paper,
  Rating,
  Typography,
} from "@mui/material"
import Link from "next/link"
import MyAvatar from "../../core/components/MyAvatar"
import { useState } from "react"

export const GalleryOverviewCard = ({
  gallery,
}: {
  gallery: Gallery & { files: File[]; tags: Tags[] }
}) => {
  const [value, setValue] = useState<number | null>(2)

  return (
    <>
      <Box mt={2}>
        <Paper elevation={5}>
          <Box p={2} mb={3}>
            <Box display={"flex"}>
              <Box mb={1}>
                <Box>
                  <Typography> {gallery.name} Gallery Name</Typography>
                  <Typography variant={"caption"} color={"grey.600"}>
                    {" "}
                    {gallery.description}
                  </Typography>
                </Box>
                <Box display={"flex"} alignItems={"center"} pt={1}>
                  <Rating name="simple-controlled" value={value} readOnly={true} />
                  <Box ml={2}>
                    {gallery.tags.map((tag) => (
                      <Box display={"inline-block"} mr={1}>
                        <Chip size={"small"} label={tag.name} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ ml: "auto" }}>
                <Button variant={"text"} sx={{ borderRadius: 1, color: "grey.700" }}>
                  <Typography fontSize={"12px"} sx={{ mr: 2 }}>
                    Karim Squalli
                  </Typography>
                  <MyAvatar sx={{ width: "32px", height: "32px" }} />
                </Button>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Grid container>
              {gallery.files.slice(0, 4).map((image) => (
                <Grid item md={3}>
                  <Link href="/galleries/1" passHref>
                    <ReactLink>
                      <Box
                        sx={{
                          backgroundImage: `url(${image["signedUrl"]})`,
                          backgroundOrigin: "center",
                          backgroundPosition: "center",
                          height: "300px",
                          mr: 2,
                        }}
                      />
                    </ReactLink>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  )
}
