export class InvalidCredentialsError extends Error {
  constructor() {
    super("Credencial invalidas");
    this.name = "InvalidCredentialsError";
  }
}
