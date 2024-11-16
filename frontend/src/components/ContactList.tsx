import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { SERVER_URL } from '../constants'
import { useNotifications } from '@toolpad/core'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { UpdateContactDialog } from './UpdateContactDialog'

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First Name', width: 120 },
  { field: 'lastName', headerName: 'Last Name', width: 120 },
  { field: 'email', headerName: 'Email', width: 280 },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 150,
    align: 'center',
  },
  { field: 'companyName', headerName: 'Company', width: 150 },
  { field: 'jobTitle', headerName: 'Job Title', width: 150 },
]

export type RowType = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  companyName: string
  jobTitle: string
}

export const ContactList = () => {
  const notification = useNotifications()

  const [selection, setSelection] = useState<GridRowId[]>([])
  const [contacts, setContacts] = useState<RowType[]>([])
  const [contactCount, setContactCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isUpdateDialogVisible, setIsUpdateDialogVisible] =
    useState<boolean>(false)
  const [detailsToUpdate, setDetailsToUpdate] = useState<RowType | null>(null)

  const fetchContacts = async (
    pageNumber: number,
    pageSize: number,
    setIsLoading: any,
  ): Promise<void> => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${SERVER_URL}/contacts?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      )
      const contacts = await res.json()

      // If response is not "ok" then showing error notification
      if (!res.ok)
        notification.show(
          contacts.statusCode +
            ': ' +
            (Array.isArray(contacts.message)
              ? contacts.message[0]
              : contacts.message),
          {
            autoHideDuration: 5000,
            severity: 'error',
          },
        )
      else setContacts([...contacts.data])
    } catch (error) {
      notification.show('Something went wrong.', {
        autoHideDuration: 5000,
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteContact = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`${SERVER_URL}/contacts/${id}`, {
        method: 'DELETE',
      })
      const response = await res.json()

      // If response is not "ok" then showing error notification
      if (!res.ok) {
        notification.show(
          response.statusCode +
            ': ' +
            (Array.isArray(response.message)
              ? response.message[0]
              : response.message),
          {
            autoHideDuration: 5000,
            severity: 'error',
          },
        )
      }
    } catch (error) {
      notification.show('Something went wrong.', {
        autoHideDuration: 5000,
        severity: 'error',
      })
    }
  }

  const updateContactCount = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/contacts/count`)
      const response = await res.json()
      setContactCount(response.data.count)
    } catch (error) {
      notification.show('Something went wrong.', {
        autoHideDuration: 5000,
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchContacts(0, 10, setIsLoading)
    updateContactCount()
  }, [])

  return (
    <Box
      component={'section'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="h4" alignSelf={'start'} marginLeft={3} marginTop={3}>
        Contacts
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Tooltip title="delete contacts">
          <IconButton
            size="large"
            aria-label="delete"
            color="warning"
            disabled={selection.length === 0}
            style={{ alignSelf: 'flex-start' }}
            onClick={async () => {
              // Array holding all the contact deletion requests
              const deletion: Promise<void>[] = []
              selection.forEach(id =>
                deletion.push(deleteContact(id.toString())),
              )

              // Awaiting for all the promises to get fulfilled
              await Promise.all(deletion)

              // Notifying the user that contacts got deleted
              notification.show(200 + ':' + 'Deleted contacts successfully.', {
                autoHideDuration: 5000,
                severity: 'success',
              })

              // Deleting all the deleted contacts from the "contacts" state array
              const newContacts = contacts.filter(
                (value: RowType) => !selection.includes(value.id),
              )
              setContacts(newContacts)

              // Changing the contacts count
              updateContactCount()
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Typography marginRight={3} color="info" fontSize={'12px'}>
          *Double-click to update a row.
        </Typography>
      </Box>

      <Paper
        style={{
          width: `${screen.width < 600 ? screen.width : screen.width - 470}px`,
        }}
      >
        <DataGrid
          editMode="row"
          onRowSelectionModelChange={selection => setSelection([...selection])}
          columns={columns}
          rows={contacts}
          checkboxSelection
          onPaginationModelChange={async page =>
            await fetchContacts(page.page, page.pageSize, setIsLoading)
          }
          loading={isLoading}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          paginationMode="server"
          rowCount={contactCount}
          pagination
          onRowDoubleClick={rowData => {
            setIsUpdateDialogVisible(true)
            setDetailsToUpdate(rowData.row)
          }}
        />
      </Paper>
      <UpdateContactDialog
        open={isUpdateDialogVisible}
        contactDetails={detailsToUpdate}
        closeDialog={() => {
          setIsUpdateDialogVisible(false)
          setDetailsToUpdate(null)
        }}
        updateDetails={(details: RowType) => {
          // Getting the index of the row
          const index = contacts.findIndex(row => row.id === details.id)
          // Making a shallow copy of the existing coontact state array
          const contactCpy = [...contacts]
          // Updatning at that index with updated contact details
          contactCpy[index] = details
          setContacts(contactCpy)
        }}
      />
    </Box>
  )
}
