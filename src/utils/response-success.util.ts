export interface IResponseSuccess<T> {
  statusCode: number;
  message: string;
  data: any;
  ok: boolean;
}

export function successResponse<T>(
  statusCode: number,
  message: string,
  data?: T
): IResponseSuccess<T> {
  return {
    statusCode,
    message,
    data,
    ok: true,
  };
}
