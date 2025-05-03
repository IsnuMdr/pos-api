export function successResponse<T>(data: T, message = "Success") {
  return {
    status: "success",
    message,
    data,
  };
}

export function errorResponse(
  message = "Something went wrong",
  statusCode = 500
) {
  return {
    status: "error",
    message,
    statusCode,
  };
}
