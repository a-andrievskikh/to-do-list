import { instance } from './basic'
import { LoginDataType } from '../features/Login/Login'
import { ResponseT } from './common-types'

export const authApi = {
  me() {
    return instance.get<ResponseT<UserT>>('auth/me')
  },
  login(loginData: LoginDataType) {
    return instance.post<ResponseT<{ userId: number }>>('auth/login', loginData)
  },
  logout() {
    return instance.delete<ResponseT>('auth/login')
  },
}

//Types
type UserT = {
  id: number
  email: string
  login: string
}
