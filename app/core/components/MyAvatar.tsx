// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, {Props as AvatarProps} from './Avatar';
import {Badge} from "@mui/material";
import Iconify from "./Iconify";
import {getGraphqlRequestClient} from "../utils/graphql/graphql-request-client";
import {useQuery} from "react-query";
import {GET_CURRENT_USER_QUERY} from "../sections/shared/user/requests/user-requests";
import {useContext, useEffect} from "react";
import {ClientContext} from "../contexts/RequestGraphqlClientContext";

// ----------------------------------------------------------------------

export default function MyAvatar({...other}: AvatarProps) {
    const {user} = useAuth()

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
        <Avatar
            src={user?.userSettings?.avatar?.signedUrl as any}
            color={undefined ? 'default' : createAvatar(user?.firstName || 'U').color}
            {...other}
        >
            {createAvatar(user?.firstName || '').name}
        </Avatar>

// </Badge>

    );
}
