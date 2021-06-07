
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeSaveAccessToken = (): SaveAccessToken => new LocalSaveAccessToken(makeLocalStorageAdapter())
