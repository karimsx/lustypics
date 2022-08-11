import { useMutation, useQuery } from "@blitzjs/rpc"
import { Chip, Divider, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import getTags from "../../../galleries/queries/tags/getTags"
import { Add, Delete } from "@mui/icons-material"
import getCurrentUser from "../../queries/getCurrentUser"
import likeTag from "../../mutations/likeTag"
import unlikeTag from "../../mutations/unlikeTag"

export const TagsForm = () => {

  const [user, { refetch: refetchUser }] = useQuery(getCurrentUser, null)
  const [tags] = useQuery(getTags, {})

  const [likeTagMutation] = useMutation(likeTag)
  const [unlikeTagMutation] = useMutation(unlikeTag)

  const handleLikeOrDislikeTag = async (tagId: number) => {
    if (user?.likedTags.find((element) => element.id === tagId)) {
      await unlikeTagMutation(tagId)
    } else {
      await likeTagMutation(tagId)
    }

    await refetchUser()

  }
  return (
    <Paper sx={{ p: 4 }}>
      <Typography mb={1} variant="h5">
        List of my preferred tags
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2"> Standard </Typography>
      <Box display="flex" flexWrap={"wrap"}>
        {tags.map((tag) => (
          <Box mr={1} mb={1}>
            <Chip label={tag.name}
                  color={user?.likedTags.find((element) => element.id === tag.id) ? "error" : "default"}
                  onDelete={() => handleLikeOrDislikeTag(tag.id)}
                  onClick={() => {}}
                  deleteIcon={user?.likedTags.find((element) => element.id === tag.id) ? <Delete />: <Add /> } />
          </Box>
        ))}
      </Box>


      <Divider />
    </Paper>
  )
}
