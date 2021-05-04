class RemoteAuthentication {
  constructor(private readonly url: string) {}
  async auth(): Promise<void> {
    return Promise.resolve();
  }
}

describe("RemoteAuthentication", () => {
  test("Should call HttpClient with correct URL", () => {
    const sut = new RemoteAuthentication(url);

    sut.auth();
    expect(httpClient.url).toBe(url);
  });
});
