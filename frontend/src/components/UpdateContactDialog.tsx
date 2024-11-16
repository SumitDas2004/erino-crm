import { Box, Dialog, DialogTitle, TextField } from '@mui/material'
import { SERVER_URL } from '../constants'
import { LoadingButton } from '@mui/lab'
import { RowType } from './ContactList'
import { useState } from 'react'
import { useNotifications } from '@toolpad/core'

export const UpdateContactDialog = (props: {
  open: boolean
  closeDialog: () => void
  contactDetails: RowType | null
  updateDetails: (details: RowType) => void
}) => {
  const notification = useNotifications()
  const { open, closeDialog, contactDetails, updateDetails } = props
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const updateContact = async (
    request: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      jobTitle: string
      companyName: string
    },
    form: any,
  ): Promise<void> => {
    try {
      setIsSubmitting(true)
      const res = await fetch(`${SERVER_URL}/contacts/${contactDetails?.id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: {
          'Content-type': 'application/json',
        },
      })
      const response = await res.json()

      // If response status is "ok" then showing success notification otherwise showing error notification
      if (res.ok) {
        notification.show(response.statusCode + ': ' + response.message, {
          autoHideDuration: 5000,
          severity: 'success',
        })

        form.target.reset()
        closeDialog()
        updateDetails(response.data)
      } else
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
    } catch (error) {
      notification.show('Something went wrong', {
        autoHideDuration: 5000,
        severity: 'error',
      })
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={closeDialog}>
      <DialogTitle marginTop={'20px'}>Update Contact</DialogTitle>
      <Box
        component={'form'}
        paddingX={3}
        style={{
          display: 'flex',
          rowGap: 25,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        paddingBottom={4}
        onSubmit={async (form: any) => {
          form.preventDefault()
          await updateContact(
            {
              firstName: form.target.elements.firstName.value,
              lastName: form.target.elements.lastName.value,
              companyName: form.target.elements.companyName.value,
              email: form.target.elements.email.value,
              phoneNumber: form.target.elements.phoneNumber.value,
              jobTitle: form.target.elements.jobTitle.value,
            },
            form,
          )
        }}
      >
        <TextField
          size="small"
          fullWidth={true}
          id={'firstName'}
          name={'firstName'}
          variant="outlined"
          label="First Name"
          autoFocus
          placeholder="eg: Jhon"
          defaultValue={contactDetails?.firstName}
        />
        <TextField
          size="small"
          fullWidth={true}
          id={'lastName'}
          name={'lastName'}
          variant="outlined"
          label="Last Name"
          placeholder="eg: Doe"
          defaultValue={contactDetails?.lastName}
        />
        <TextField
          size="small"
          type="text"
          fullWidth={true}
          id={'email'}
          name={'email'}
          variant="outlined"
          label="Email"
          placeholder="eg: jhondoe@example.com"
          defaultValue={contactDetails?.email}
        />
        <TextField
          size="small"
          type="text"
          fullWidth={true}
          id={'phoneNumber'}
          name={'phoneNumber'}
          variant="outlined"
          label="Phone Number"
          placeholder="eg: +911234567890"
          defaultValue={contactDetails?.phoneNumber}
        />
        <TextField
          size="small"
          fullWidth={true}
          id={'companyName'}
          name={'companyName'}
          variant="outlined"
          label="Company Name"
          placeholder="eg: Google"
          defaultValue={contactDetails?.companyName}
        />
        <TextField
          size="small"
          fullWidth={true}
          id={'jobTitle'}
          name={'jobTitle'}
          variant="outlined"
          label="Job Title"
          placeholder="eg: Software Engineer"
          defaultValue={contactDetails?.jobTitle}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </LoadingButton>
      </Box>
    </Dialog>
  )
}
