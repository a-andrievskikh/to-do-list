import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppRootStateT, AppDispatch } from './store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector