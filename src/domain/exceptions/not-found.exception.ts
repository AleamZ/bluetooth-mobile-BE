import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found") {
    super(HttpStatus.NOT_FOUND, message);
  }
}
