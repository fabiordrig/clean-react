import { RemoteAddAccount } from '@/data/usecases/add-acount/remote-add-account'
import { makeAxios } from '../../http/axios-factory'

export const makeRemoteAddAccount = (url: string): RemoteAddAccount => new RemoteAddAccount(url, makeAxios())
