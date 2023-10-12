import { setAppStatusAC, setInitializedAC } from '../../app/app-reducer'
import axios from 'axios'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { AppThunk } from '../../app/store'
import { authApi } from '../../api/auth-api'
import { ResultCodes } from '../../api/todolists-api'
import { LoginDataType } from './Login'

const SET_IS_LOGGED_IN = 'login/SET-IS-LOGGED-IN'

const initialState = {
  isLoggedIn: false,
}


export const authReducer = (state: AuthStateType = initialState, action: AuthActionsT): AuthStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN: {
      return { ...state, isLoggedIn: action.value }
    }
    default:
      return state
  }
}

// Actions
export const setIsLoggedAC = (value: boolean) => ({ type: SET_IS_LOGGED_IN, value } as const)

// Thunks
export const loginTC = (data: LoginDataType): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authApi.login(data)
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const meTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authApi.me()
    if (res.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      handleServerNetworkError(dispatch, e.message)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  } finally {
    dispatch(setInitializedAC(true))
  }
}

// Types
export type AuthActionsT = ReturnType<typeof setIsLoggedAC>
type AuthStateType = typeof initialState
type ErrorType = {
  statusCode: 0,
  messages: [{
    message: string,
    field: string
  }],
  error: string
}