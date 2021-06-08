
import { HttpPostClientSpy } from '../../tests/mock-http-client'
import { RemoteAddAccount } from './remote-add-account'
import { mockAddAccountParams } from '@/domain/test/mock-account'
import { AccountModel } from '@/domain/models/account-model'
import { AddAccountParams } from '@/domain/usecases/add-account'
import faker from 'faker'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { sut, httpPostClientSpy }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const body = mockAddAccountParams()
    await sut.add(body)
    expect(httpPostClientSpy.body).toEqual(body)
  })

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    const body = mockAddAccountParams()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN
    }
    const promise = sut.add(body)
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
