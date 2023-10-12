const APP_SET_STATUS = 'APP/SET-STATUS'
const APP_SET_ERROR = 'APP/SET-ERROR'
const APP_SET_INITIALIZED = 'APP/SET_INITIALIZED'

const initialState: AppStateT = {
  status: 'loading',
  error: null,
  isInitialized: false,
  //'Error message 😠'
}

export const appReducer = (state: AppStateT = initialState, action: AppActionsT): AppStateT => {
  switch (action.type) {
    case APP_SET_STATUS: {
      return { ...state, status: action.status }
    }
    case APP_SET_ERROR: {
      return { ...state, error: action.error }
    }
    case APP_SET_INITIALIZED: {
      return { ...state, isInitialized: action.isInitialized }
    }
    default:
      return state
  }
}

// Actions
export const setAppStatusAC = (status: RequestStatusT) => ({ type: APP_SET_STATUS, status } as const)
export const setAppErrorAC = (error: ResponseErrorT) => ({ type: APP_SET_ERROR, error } as const)
export const setInitializedAC = (isInitialized: boolean) => ({ type: APP_SET_INITIALIZED, isInitialized } as const)

// Types
export type AppActionsT =
  ReturnType<typeof setAppStatusAC> |
  ReturnType<typeof setAppErrorAC> |
  ReturnType<typeof setInitializedAC>

export type RequestStatusT = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ResponseErrorT = string | null
export type AppStateT = {
  status: RequestStatusT
  error: ResponseErrorT
  isInitialized: boolean
}