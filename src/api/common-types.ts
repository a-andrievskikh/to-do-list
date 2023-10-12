export type ResponseT<D = {}> = {
  data: D
  resultCode: number
  messages: string[]
}