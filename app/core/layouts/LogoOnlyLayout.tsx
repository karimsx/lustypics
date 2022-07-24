import { ReactNode } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'relative',
  padding: 0
}));

// ----------------------------------------------------------------------

type Props = {
  children?: ReactNode;
};

export default function LogoOnlyLayout({ children }: Props) {
  return (
    <>
      <HeaderStyle>
        <Logo sx={{position: 'absolute'}} styles={{maxWidth: 100}} />
      </HeaderStyle>
      {children}
    </>
  );
}
