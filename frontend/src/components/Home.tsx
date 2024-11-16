import { Box, Link, Typography } from '@mui/material'

export const HomeComponent = () => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      flexDirection={'column'}
      paddingX={2}
    >
      <Typography variant={'h4'} margin={1}>
        Home
      </Typography>
      <Typography
        width={'100%'}
        variant="body1"
        maxWidth={800}
      >
        Welcome to Customer Relationship Management application of Erino created
        by Sumit Das. Navigate to the "Contacts" page through the left
        navigation bar to get list of your contacts. Also find the "Create"
        button to create a new contact.
      </Typography>
      <Typography marginTop={2} variant='subtitle2'>
        Find the repository{' '}
        <Link href="https://github.com/SumitDas2004/crm" target="_blank">
          here
        </Link>
        .
      </Typography>
    </Box>
  )
}
