import { Box, Divider, IconButton, Badge, MenuItem } from "@mui/material"
import { useCurrentUser } from "../hooks/useCurrentUser"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MailIcon from "@mui/icons-material/Mail"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import MoreIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "../../auth/mutations/logout"

export const AuthUserMenu = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleLogout = async () => {
    await logoutMutation()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href={"/user/profile"}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>{" "}
      <Link href={"/user/account"}>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Link>
      <Link href={"/user/galleries"}>
        <MenuItem onClick={handleMenuClose}>My Galleries</MenuItem>
      </Link>
      <Link href={"/"}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Link>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <Divider orientation="vertical" />
      <Box mr={2} />
      {/*<IconButton size="large" aria-label="show 4 new mails" color="inherit">*/}
      {/*  <Badge badgeContent={4} color="error">*/}
      {/*    <MailIcon />*/}
      {/*  </Badge>*/}
      {/*</IconButton>*/}
      {/*<IconButton size="large" aria-label="show 17 new notifications" color="inherit">*/}
      {/*  <Badge badgeContent={17} color="error">*/}
      {/*    <NotificationsIcon />*/}
      {/*  </Badge>*/}
      {/*</IconButton>*/}
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      {renderMobileMenu}
      {renderMenu}
    </>
  )
}
