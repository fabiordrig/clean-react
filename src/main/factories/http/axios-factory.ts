import { AxiosHttpClient } from '@/infra/http/axios/axios-http-client'

export const makeAxios = (): AxiosHttpClient => new AxiosHttpClient()
