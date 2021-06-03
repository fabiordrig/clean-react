import faker from 'faker'
import { SetStorageSpy } from '@/data/tests/mock-storage'
import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorage: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorage = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorage)

  return { sut, setStorage }
}

describe('LocalSaveAccessToken', () => {
  test('Should call setStorage with correct values', async () => {
    const { sut, setStorage } = makeSut()
    const accessToken = faker.datatype.uuid()

    await sut.save(accessToken)

    expect(setStorage.key).toBe('accessToken')
    expect(setStorage.value).toBe(accessToken)
  })

  test('Should throw if setStorage throws', async () => {
    const { sut, setStorage } = makeSut()
    const accessToken = faker.datatype.uuid()

    jest.spyOn(setStorage, 'set').mockRejectedValue(new Error())

    const promise = sut.save(accessToken)

    await expect(promise).rejects.toThrow()
  })
})
