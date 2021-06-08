import { HttpPostClient } from '../../protocols/http/http-post-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/account-model'
import { AddAccount, AddAccountParams } from '@/domain/usecases/add-account'
import { EmailInUseError } from '@/domain/errors/email-in-use-error'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const response = await this.httpClient.post({ url: this.url, body: params })

    switch (response.statusCode) {
      case HttpStatusCode.OK:
        return response.body
      case HttpStatusCode.FORBIDDEN:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
