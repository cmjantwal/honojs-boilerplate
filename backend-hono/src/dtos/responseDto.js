export class ResponseDto {
    constructor(success, data = null, message = null, statusCode = 200) {
      this.success = success;
      this.message = message;
      this.data = data;
      this.statusCode = statusCode;
    }
  
    static success(data = null, message = null) {
      return new ResponseDto(true, data, message);
    }
  
    static error(message, statusCode = 400) {
      return new ResponseDto(false, null, message, statusCode);
    }
  }