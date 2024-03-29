export enum HttpStatusCode {
  OK = 200,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
