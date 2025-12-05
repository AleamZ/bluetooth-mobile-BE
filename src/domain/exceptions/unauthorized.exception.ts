import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized") {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
