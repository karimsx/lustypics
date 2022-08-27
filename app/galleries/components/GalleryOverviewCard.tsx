import { Box } from "@mui/system"
import { Gallery, File, Tags, User } from "db"
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
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export const GalleryOverviewCard = ({
  gallery,
  ...other
}: {
  gallery: Gallery & { files: File[]; tags: Tags[]; owner?: User }
}) => {
  const [value, setValue] = useState<number | null>(2)
  const router = useRouter()

  return (
    <Box mt={2} {...other}>
      <Paper elevation={5}>
        <Box p={2} mb={3}>
          <Box display={"flex"}>
            <Box mb={1}>
              <Box>
                <Typography> {gallery.name}</Typography>
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
                      <Chip
                        onClick={() =>
                          router.push({
                            href: "/galleries",
                            query: {
                              tags: tag.id,
                            },
                          })
                        }
                        size={"small"}
                        label={tag.name}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <Button variant={"text"} sx={{ borderRadius: 1, color: "grey.700" }}>
                <Typography fontSize={"12px"} sx={{ mr: 2 }}>
                  {gallery?.owner?.name}
                </Typography>
                <MyAvatar sx={{ width: "32px", height: "32px" }} />
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container>
            {gallery.files.slice(0, 4).map((image) => (
              <Grid item md={3}>
                <Link href={`/galleries/${gallery.id}`} passHref>
                  <ReactLink>
                    <Box
                      sx={{
                        borderRadius: "5px",
                        backgroundImage: `url(${image["signedUrl"]})`,
                        backgroundOrigin: "center",
                        backgroundPosition: "center",
                        height: "200px",
                        mr: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                        "&:hover": {
                          boxShadow: 5,
                        },
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
  )
}
