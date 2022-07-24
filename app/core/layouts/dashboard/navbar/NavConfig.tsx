// routes
import {PATH_ADMIN, PATH_DASHBOARD} from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

export const navConfigAdmin = [
  {
    subheader: '',
    items: [
      { title: 'Dashboard', path: PATH_ADMIN.dashboard, icon: ICONS.dashboard },
      { title: 'Utilisateurs', path: PATH_ADMIN.users, icon: ICONS.user },
      { title: 'Sondages', path: PATH_ADMIN.pools, icon: ICONS.booking },
      { title: 'Jeux', path: PATH_ADMIN.games, icon: ICONS.dashboard },

      // { title: 'Jeux', path: PATH_ADMIN.pools, icon: ICONS.banking },

      // {
      //   title: "Kanban",
      //   path: "/dashboard/kanban",
      //   icon: ICONS.games,
      // },
      // {
      //   title: "Quiz",
      //   path: "/schedule",
      //   icon: ICONS.banking,
      // },
      // {
      //   title: "Evenement",
      //   path: "/schedule",
      //   icon: ICONS.analytics,
      // },

      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard,
      // },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },
]


const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
    // subheader: 'general',
    // items: [
      // { title: 'Sondages', path: PATH_DASHBOARD.general.pools, icon: ICONS.booking },
      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard,
      // },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    // ],
  // },

  // {
  //   subheader: 'admin',
  //   items: [
  //     { title: 'Gestion Sondage', path: PATH_DASHBOARD.admin.pool, icon: ICONS.booking },
  //     // {
  //     //   title: 'app',
  //     //   path: PATH_DASHBOARD.general.app,
  //     //   icon: ICONS.dashboard,
  //     // },
  //     // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //   ],
  // },

  {
    subheader: 'generale',
    items: [
      { title: 'Sondages', path: PATH_DASHBOARD.pools, icon: ICONS.booking },
      { title: 'Jeux', path: PATH_DASHBOARD.games, icon: ICONS.dashboard },

      // { title: 'Cours', path: PATH_DASHBOARD.games, icon: ICONS.kanban },

      // { title: 'Drive', path: '/dashboard/drive', icon: ICONS.booking },
      // {
      //   title: "Kanban",
      //   path: "/dashboard/kanban",
      //   icon: ICONS.games,
      // },
      // {
      //   title: "Quiz",
      //   path: "/schedule",
      //   icon: ICONS.banking,
      // },
      // {
      //   title: "Evenement",
      //   path: "/schedule",
      //   icon: ICONS.analytics,
      // },

      // {
      //   title: 'app',
      //   path: PATH_DASHBOARD.general.app,
      //   icon: ICONS.dashboard,
      // },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // {
  //   subheader: 'Etudes',
  //   items: [
  //     {
  //       title: 'Cours',
  //       path: PATH_DASHBOARD.study.course.dashboard,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Tous les cours', path: PATH_DASHBOARD.study.course.allcourses },
  //         { title: 'Mes cours', path: PATH_DASHBOARD.study.course.mycourses },
  //       ],
  //     },
  //     { title: 'Prise de note', path: PATH_DASHBOARD.study.notes, icon: ICONS.booking },
  //     {
  //       title: "Emploie du temp",
  //       path: PATH_DASHBOARD.study.schedule,
  //       icon: ICONS.calendar,
  //     },
  //
  //     // {
  //     //   title: 'app',
  //     //   path: PATH_DASHBOARD.general.app,
  //     //   icon: ICONS.dashboard,
  //     // },
  //     // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.newUser },
  //         { title: 'edit', path: PATH_DASHBOARD.user.editById },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },
  //
  //     // MANAGEMENT : E-COMMERCE
  //     {
  //       title: 'e-commerce',
  //       path: PATH_DASHBOARD.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //         { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
  //         { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //         { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
  //         { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
  //         { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //         { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
  //       ],
  //     },
  //
  //     // MANAGEMENT : BLOG
  //     {
  //       title: 'games',
  //       path: PATH_DASHBOARD.games.root,
  //       icon: ICONS.games,
  //       children: [
  //         { title: 'posts', path: PATH_DASHBOARD.games.posts },
  //         { title: 'post', path: PATH_DASHBOARD.games.postById },
  //         { title: 'new post', path: PATH_DASHBOARD.games.newPost },
  //       ],
  //     },
  //   ],
  // },
  //
  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban,
  //     },
  //   ],
  // },
];

export default navConfig;
