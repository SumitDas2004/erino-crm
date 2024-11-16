import { Box, TextField, Typography } from '@mui/material'
import { SERVER_URL } from '../constants'
import { useNotifications } from '@toolpad/core'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

export const CreateContact = () => {
  const notification = useNotifications()
  const [isSubmitting, setIsSubmitting] = useState<boolean>()

  const createContact = async (
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
      const res = await fetch(`${SERVER_URL}/contacts`, {
        method: 'POST',
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
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      component={'section'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography variant="h4" alignSelf={'start'} marginX={'auto'} marginY={3}>
        Create Contact
      </Typography>
      <Box
        component={'form'}
        width={'60vw'}
        style={{
          display: 'flex',
          columnGap: 20,
          rowGap: 25,
          justifyContent: 'center',
          alignItems: 'center',
          width: 'min(90vw, 600px)',
          flexDirection: 'column',
        }}
        paddingBottom={8}
        onSubmit={async (form: any) => {
          form.preventDefault()
          await createContact(
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
          fullWidth={true}
          id={'firstName'}
          name={'firstName'}
          variant="outlined"
          label="First Name"
          autoFocus
          placeholder="eg: Jhon"
        />
        <TextField
          fullWidth={true}
          id={'lastName'}
          name={'lastName'}
          variant="outlined"
          label="Last Name"
          placeholder="eg: Doe"
        />
        <TextField
          type="text"
          fullWidth={true}
          id={'email'}
          name={'email'}
          variant="outlined"
          label="Email"
          placeholder="eg: jhondoe@example.com"
        />
        <TextField
          type="text"
          fullWidth={true}
          id={'phoneNumber'}
          name={'phoneNumber'}
          variant="outlined"
          label="Phone Number"
          placeholder="eg: +911234567890"
        />
        <TextField
          fullWidth={true}
          id={'companyName'}
          name={'companyName'}
          variant="outlined"
          label="Company Name"
          placeholder="eg: Google"
        />
        <TextField
          fullWidth={true}
          id={'jobTitle'}
          name={'jobTitle'}
          variant="outlined"
          label="Job Title"
          placeholder="eg: Software Engineer"
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
    </Box>
  )
}
