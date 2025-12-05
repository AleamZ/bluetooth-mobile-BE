export class HttpException extends Error {
  public status: number = 500;
  public message: string = "Internal Server Error";

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  toResponse() {
    return {
      ok: false,
      statusCode: this.status,
      message: this.message,
    };
  }
}
