import { Box } from "@mui/system"


export const SelectableImage = ({url, handleSelectImage}) => {
  return <>
    <Box
      onClick={(evt) => handleSelectImage(evt, null)}
      sx={{
        backgroundImage: `url(${url})`,
        backgroundOrigin: "center",
        backgroundPosition: "center",
        height: "300px",
        mr: 2,
        mb: 2,
        cursor: "pointer",
        borderRadius: "10px",
        boxShadow: "0 0 5px black",

        "&:hover": {
          boxShadow: "0 0 20px black",
          border: "2px solid grey",
        }

      }}
    />
  </>
}
