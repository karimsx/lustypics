import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Box, BoxProps, Link, Toolbar} from '@mui/material';
import {HEADER} from "./config";

// ----------------------------------------------------------------------



const LogoImageStyled = styled('img')(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,

  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),

}));

interface Props extends BoxProps {
  disabledLink?: boolean;
  sx?: any,
  styles?: any,
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<any, Props>(({ disabledLink = false, sx, styles, ...other }, ref) => {
  const theme = useTheme();

  return <NextLink href={"/"} passHref>
    <Link>
      <Box sx={sx}>
        <LogoImageStyled style={{
          ...styles,
        }}  src="/logo/logo_monamphi.png"/>
      </Box>
    </Link>
  </NextLink>
});

export default Logo;
