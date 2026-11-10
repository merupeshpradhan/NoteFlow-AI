class ApiError extends Error {
  statusCode: number;
  data: any[];
  error: boolean;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "Somthing went wrong",
    data: any[] = [],
    error: boolean = true,
    success: boolean = false,
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
    this.success = success;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
