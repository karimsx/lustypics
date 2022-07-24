// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../components/config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Accueil',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },

  {
    title: 'Nous Contacter',
    icon: <Iconify icon={'eva:email-outline'} {...ICON_SIZE} />,
    path: '/contact',
  },
  {
    title: 'Connexion',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: PATH_AUTH.login,
  },
];

export default menuConfig;
