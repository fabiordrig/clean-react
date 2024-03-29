import axios from 'axios'
import faker from 'faker'

export const mockHttpResponse = (): object => ({
  data: faker.datatype.json(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
