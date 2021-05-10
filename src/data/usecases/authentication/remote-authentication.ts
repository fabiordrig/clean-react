import { HttpPostClient } from "../../protocols/http/http-post-client";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credential-errors";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}
  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpClient.post({ url: this.url, body: params });

    switch (response.statusCode) {
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError();
    }
  }
}
