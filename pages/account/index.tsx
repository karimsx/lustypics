import { Suspense, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import { FormProvider } from "app/core/components/hook-form"
import { GeneralSettingsForm } from "app/users/components/GeneralSettingsForm"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { ChangePasswordForm } from "app/users/components/ChangePasswordForm"
import { NotificationForm } from "app/users/components/NotificationForm"
import { TagsForm } from "app/users/components/TagsForm"
import { TheatersOutlined } from "@mui/icons-material"

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const CategoriesPage = () => {
  const cards = [
    0, 1, 2, 3, 4, 5, 6, 8, 7, 4, 6, 8, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  ]

  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const theme = useTheme()

  return (
    <>
      <Box
        sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}
        mt={4}
        mb={-3}
        py={3}
      >
        <Container>
          <Typography mb={1} variant="h4" component="h2">
            My account
          </Typography>

          <Typography mb={2} variant="h6" component="h3">
            Change account information
          </Typography>
        </Container>
        /
      </Box>
      <Container>
        <TabContext value={value}>
          <Grid container>
            <Grid item md={4}>
              <Paper sx={{ mr: 4 }}>
                <TabList
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: "divider" }}
                >
                  <Tab label="General" value="1" />
                  <Tab label="Security" value="2" />
                  <Tab label="Notifications" value="3" />
                  <Tab label="Prefered Tags" value="4" />
                </TabList>
              </Paper>
            </Grid>

            <Grid item md={8}>
              <TabPanel sx={{ p: 0 }} value="1">
                <GeneralSettingsForm />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="2">
                <ChangePasswordForm />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="3">
                <NotificationForm />
              </TabPanel>
              <TabPanel sx={{ p: 0 }} value="4">
                <TagsForm />
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Container>
    </>
  )
}

export default CategoriesPage
