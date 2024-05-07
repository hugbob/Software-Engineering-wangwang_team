import React from 'react'
import { Alert ,AlertTitle } from '@mui/material'

const Notfound = () => {
  return (
    <Alert severity="warning">
  <AlertTitle>Warning</AlertTitle>
  Oops! you are in the middle of no where — <strong>The page is not Found!</strong>
</Alert>
  )
}

export default Notfound