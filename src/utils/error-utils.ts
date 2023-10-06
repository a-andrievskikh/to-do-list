import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer'
import { ResponseType } from '../api/tasks-api'
import { Dispatch } from 'redux'

const errorText = 'Some error occurred'

export const handleServerAppError = <D>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC(errorText))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
  dispatch(setAppErrorAC(error ? error : errorText))
  dispatch(setAppStatusAC('failed'))
}

// Types
type ErrorUtilsDispatchType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>