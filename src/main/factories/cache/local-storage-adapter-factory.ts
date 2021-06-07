
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter()