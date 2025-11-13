// Discriminated union for API responses
type SuccessResult<T = unknown> = {
  status: "success";
  data: T;
};

type ErrorResult = {
  status: "error";
  message: string;
  code?: string;
  stdout?: string;
  stderr?: string;
};

export type ActionResult<T = unknown> = SuccessResult<T> | ErrorResult;