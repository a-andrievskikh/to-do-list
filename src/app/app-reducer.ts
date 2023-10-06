const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'

const initialState: AppStateType = {
  status: 'loading',
  error: null,
  //'Error message 😠'
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case APP_SET_STATUS: {
      return { ...state, status: action.status }
    }
    case APP_SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

// Actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: APP_SET_STATUS, status } as const)
export const setAppErrorAC = (error: ResponseErrorType) => ({ type: APP_SET_ERROR, error } as const)

// Types
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorType = string | null
export type AppStateType = {
  status: RequestStatusType
  error: ResponseErrorType
}