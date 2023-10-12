import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loginTC } from './auth-reducer'
import { Navigate } from 'react-router-dom'

const validate = (values: FormikErrorType) => {
  const errors: FormikErrorType = {}
  const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  const passwordRegexp = /^.{4,20}$/i

  if (!values.email) {
    errors.email = 'Required'
  } else if (!emailRegexp.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (!passwordRegexp.test(values.password)) {
    errors.password = 'Must be 4 >= character <= 20'
  }
  return errors
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(s => s.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: () => {
      dispatch(loginTC(formik.values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  const isButtonDisabled =
    !!Object.values(formik.errors).length ||
    !formik.values.email ||
    !formik.values.password

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>To log in get registered
                <a href={'https://social-network.samuraijs.com/'}
                   target={'_blank'}
                   rel="noreferrer"> here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email"
                         margin="normal"
                         {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
              <TextField type="password"
                         label="Password"
                         margin="normal"
                         {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password &&
                <div style={{ color: 'red' }}>{formik.errors.password}</div>}

              <FormControlLabel label={'Remember me'}
                                control={
                                  <Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                  />}
              />
              <Button type={'submit'}
                      variant={'contained'}
                      color={'primary'}
                      disabled={isButtonDisabled}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}

// Types
type FormikErrorType = {
  email?: string
  password?: string
}

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}