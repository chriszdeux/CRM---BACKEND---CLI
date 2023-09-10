export const httpStatusCodes = {
  ok: {
    code: 200,
    message: "OK: The request was successful."
  },
  created: {
    code: 201,
    message: "Created: The request was successful, and a new resource was created."
  },
  noContent: {
    code: 204,
    message: "No Content: The request was successful, but there is no additional content to send."
  },
  badRequest: {
    code: 400,
    message: "Bad Request: The server could not understand the request."
  },
  unauthorized: {
    code: 401,
    message: "Unauthorized: The client is not authorized to access the requested resource."
  },
  forbidden: {
    code: 403,
    message: "Forbidden: Access to the requested resource is forbidden."
  },
  notFound: {
    code: 404,
    message: "Not Found: The requested resource could not be found on the server."
  },
  internalServerError: {
    code: 500,
    message: "Internal Server Error: The server encountered an error while processing the request."
  },
  serviceUnavailable: {
    code: 503,
    message: "Service Unavailable: The server is currently unable to handle the request due to overload or maintenance."
  }
};
