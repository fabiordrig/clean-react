import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/test/mock-axios'
import axios from 'axios'
import { mockPostRequest } from '@/data/tests'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with the correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()

    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const response = sut.post(mockPostRequest())
    expect(response).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
