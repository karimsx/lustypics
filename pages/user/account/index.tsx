import { useState } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Container, Paper, Tab, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { GeneralSettingsForm } from "app/users/components/GeneralSettingsForm"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { ChangePasswordForm } from "app/users/components/ChangePasswordForm"
import { NotificationForm } from "app/users/components/NotificationForm"
import { TagsForm } from "app/users/components/tagform/TagsForm"
import { User } from "db"
import { GenericHeader } from "../../../app/core/components/GenericHeader"

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  }
}

const UserAccountPage = () => {
  const user = useCurrentUser()
  const theme = useTheme()

  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }


  return (
    <>

      <GenericHeader primaryText={"Account settings"}  />

      <Container>
        <TabContext value={value}>
          <Paper sx={{ mt: -3, mr: 4 }}>
            <TabList
              orientation="horizontal"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, p: 1, px: 2,  mb: 2, borderColor: "divider" }}
            >
              <Tab label="General" value="1" />
              <Tab label="Security" value="2" />
              <Tab label="Notifications" value="3" />
              <Tab label="Prefered Tags" value="4" />
            </TabList>
          </Paper>

          <TabPanel sx={{ p: 0 }} value="1">
            <GeneralSettingsForm user={user as User} />
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
        </TabContext>
      </Container>
    </>
  )
}

export default UserAccountPage
