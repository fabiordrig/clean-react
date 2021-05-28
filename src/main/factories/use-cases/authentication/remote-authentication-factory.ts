import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxios } from '../../http/axios-factory'

export const makeRemoteAuthentication = (url: string): RemoteAuthentication => new RemoteAuthentication(url, makeAxios())
