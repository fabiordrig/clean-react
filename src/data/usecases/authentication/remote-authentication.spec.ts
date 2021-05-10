import { HttpPostClientSpy } from "../../tests/mock-http-client";
import faker from "faker";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credential-errors";
import { HttpStatusCode } from "@/data/protocols/http/http-response";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
  test("Should call HttpPostClient with correct body", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const body = mockAuthentication();
    await sut.auth(body);
    expect(httpPostClientSpy.body).toEqual(body);
  });
  test("Should throw InvalidCredentialError iff HttpPostClient returns 401", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const body = mockAuthentication();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED,
    };
    const promise = sut.auth(body);
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
