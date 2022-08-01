// utils
import createAvatar from "../utils/createAvatar"
//
import Avatar, { Props as AvatarProps } from "./Avatar"
import { Badge } from "@mui/material"
import Iconify from "./Iconify"
import { useContext, useEffect } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const user = useCurrentUser()

  return (
    // <Badge
    //     overlap="circular"
    //     anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    //     badgeContent={
    //         <Iconify sx={{width: "20px", height: "20px", color: "success.main"}} mr={2}
    //                  icon={"eva:checkmark-circle-2-fill"}/>
    //
    //     }
    // >
    <Avatar color={undefined ? "default" : createAvatar(user?.name || "U").color} {...other}>
      {createAvatar(user?.name || "").name}
    </Avatar>

    // </Badge>
  )
}
