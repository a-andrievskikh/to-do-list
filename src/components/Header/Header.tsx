import { memo } from 'react'
import { AppBar, Button, IconButton, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'

export const Header = memo(() => {
  return (
    <AppBar position="static">
      <IconButton>
        <Menu />
      </IconButton>
      <Typography variant="h6">
        Todolist
      </Typography>
      <Button color={'inherit'}>Login</Button>
    </AppBar>
  )
})