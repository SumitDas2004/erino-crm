import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ContactList } from './components/ContactList.tsx'
import { CreateContact } from './components/CreateContact.tsx'
import { StrictMode } from 'react'
import {HomeComponent} from './components/Home.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <HomeComponent/>,
      },
      {
        path: '/contacts',
        element: <ContactList />,
      },
      {
        path: '/create-contact',
        element: <CreateContact />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
