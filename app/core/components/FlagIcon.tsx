import {Box} from "@mui/material";

export interface FlagIconProps {
    countryCode: string
    [k: string]: any
}

export const FlagIcon = ({countryCode, ...other}: FlagIconProps) => {

    return <Box {...other}>
        <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
            alt=""
        />
    </Box>
}