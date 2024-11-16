import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Navigation } from '@toolpad/core/AppProvider'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { AppProvider } from '@toolpad/core/react-router-dom'
import { Outlet } from 'react-router-dom'
import logo from './assets/erinoofficial_logo.jpeg'
import { NotificationsProvider } from '@toolpad/core'

const navigation: Navigation = [
  {
    icon: <HomeOutlinedIcon />,
    title: 'Home',
    segment: '',
  },
  {
    icon: <ContactsOutlinedIcon />,
    title: 'Contacts',
    segment: 'contacts',
  },
  {
    icon: <AddCircleOutlineOutlinedIcon />,
    title: 'Create',
    segment: 'create-contact',
  },
]

function App() {
  return (
    <AppProvider
      navigation={navigation}
      branding={{
        title: 'Erino',
        logo: <img src={logo} style={{ borderRadius: '99999px' }} />,
      }}
    >
      <NotificationsProvider/>
      <DashboardLayout disableCollapsibleSidebar>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default App
