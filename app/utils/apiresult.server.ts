// Discriminated union for API responses
export type SuccessResult<T = unknown> = {
  status: "success"
  data: T
}

export type ErrorResult = {
  status: "error"
  message: string
  code?: string
  stdout?: string
  stderr?: string
}

export type ActionResult<T = unknown> = SuccessResult<T> | ErrorResult
