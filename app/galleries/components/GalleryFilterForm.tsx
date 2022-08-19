import { Box } from "@mui/system"
import { Gallery, File, Tags, User } from "db"
import {
  Button,
  Chip,
  Divider,
  Grid,
  Link as ReactLink,
  MenuItem,
  Paper,
  Rating,
  Typography,
} from "@mui/material"
import Link from "next/link"
import MyAvatar from "../../core/components/MyAvatar"
import { useEffect, useState } from "react"
import Form from "app/core/components/Form"
import { FormProvider, RHFSelect, RHFTextField } from "app/core/components/hook-form"
import { RHFAutoComplete } from "app/core/components/hook-form/RHFAutoComplete"
import { useQuery } from "@blitzjs/rpc"
import getTags from "../queries/tags/getTags"
import { useForm, useWatch } from "react-hook-form"
import { useDebounce } from "usehooks-ts"

export const GalleryFilterForm = ({ onChange }) => {
  const [tags] = useQuery(getTags, {})
  const [term, setTerm] = useState<string>("")
  const debouncedTerm = useDebounce<string>(term, 500)

  const ctx = useForm({
    mode: "onBlur",
    defaultValues: {
      term: "",
      tags: [],
      orderBy: "latest",
    },
  })

  const watchedTerm = useWatch({
    control: ctx.control,
    name: "term",
  })

  const watchedTagsAndOrderBy = useWatch({
    control: ctx.control,
    name: ["tags", "orderBy"],
  })

  useEffect(() => {
    setTerm(watchedTerm)
  }, [watchedTerm])

  useEffect(() => {
    onChange({
      term: debouncedTerm,
      tags: watchedTagsAndOrderBy[0]?.map((tag) => tag.id),
      orderBy: watchedTagsAndOrderBy[1],
    })
  }, [debouncedTerm, watchedTagsAndOrderBy])

  return (
    <>
      <FormProvider
        methods={ctx}
        onSubmit={() => {
          console.log("called")
        }}
      >
        <Box mt={2} display={"flex"}>
          <RHFTextField
            size="small"
            name="term"
            placeholder="Search Term"
            sx={{ width: 200, mr: 2 }}
          />

          <RHFAutoComplete
            multiple={true}
            name={"tags"}
            size={"small"}
            sx={{ width: 300 }}
            placeholder={"Enter tag here"}
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

          <RHFSelect sx={{ ml: "auto", width: 200 }} size="small" name="orderBy" variant="filled">
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="most_viewed">Most viewed</MenuItem>
            <MenuItem value="best_rated">Best rated</MenuItem>
          </RHFSelect>
        </Box>
      </FormProvider>
    </>
  )
}
