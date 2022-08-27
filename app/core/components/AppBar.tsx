import { styled, alpha } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import InputBase from "@mui/material/InputBase"
import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MailIcon from "@mui/icons-material/Mail"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MoreIcon from "@mui/icons-material/MoreVert"
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Link as ReactLink } from "@mui/material"
import Link from "next/link"
import { AuthUserMenu } from "./AuthUserMenu"
import { useCurrentUser } from "../hooks/useCurrentUser"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import { useState } from "react"
import ExploreIcon from "@mui/icons-material/Explore"
import ImageIcon from "@mui/icons-material/Image"
import CategoryIcon from "@mui/icons-material/Category"
import PeopleIcon from "@mui/icons-material/People"
import { useRouter } from "next/router"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

const menu = {
  explore: {
    icon: <ExploreIcon />,
    link: "/",
    label: "Explore",
  },
  galleries: {
    icon: <ImageIcon />,
    link: "/galleries",
    label: "Galleries",
  },
  categories: {
    icon: <CategoryIcon />,
    link: "/categories",
    label: "Categories",
  },
  members: {
    icon: <PeopleIcon />,
    link: "/members",
    label: "Members",
  },
}

export default function PrimaryAppBar() {
  const user = useCurrentUser()
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {Object.keys(menu).map((menuItem, index) => (
          <Link href={menu[menuItem].link}>
            <ListItem key={menuItem} disablePadding>
              <ListItemButton>
                <ListItemIcon>{menu[menuItem].icon}</ListItemIcon>
                <ListItemText primary={menu[menuItem].label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  const [search, setSearch] = useState<string | undefined>(undefined)

  const onSearch = async () => {
    await router.push(`/galleries?term=${search}`)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {list()}
          </Drawer>

          <Box display={{ sm: "flex", md: "none" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Link href="/" passHref>
            <ReactLink>
              <Typography variant="h6" color={"white"} noWrap component="div" sx={{ mr: 2 }}>
                LustyPics
              </Typography>
            </ReactLink>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onKeyDown={async (evt) => {
                if (evt.key == "Enter") {
                  await onSearch()
                }
              }}
              onSubmit={onSearch}
              onChange={(evt) => setSearch(evt.target.value)}
              value={search}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {Object.keys(menu).map((menuItem) => (
              <Link href={menu[menuItem].link}>
                <Button sx={{ display: "flex", alignItems: "center" }} color="inherit">
                  <Box mr={1}>{menu[menuItem].icon}</Box>
                  {menu[menuItem].label}
                </Button>
              </Link>
            ))}
          </Box>

          <Divider sx={{ mx: 2 }} orientation="vertical" />

          <Box>
            {!user && (
              <>
                <Link href="/auth/signup">
                  <Button color="inherit">Signup</Button>
                </Link>

                <Link href="/auth/login">
                  <Button color="inherit">Login</Button>
                </Link>
              </>
            )}

            {user && (
              <>
                <AuthUserMenu />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
