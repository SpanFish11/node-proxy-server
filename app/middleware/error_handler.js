const errorHandler = (error, request, response) => {
  const statusCode = error.code || 500
  const message = error.message || 'Internal Server Error'

  const body = {
    error: {
      code: statusCode,
      message
    }
  }

  if (error.details) {
    body.error.details = error.details
  }

  response.status(statusCode).json(body)
}

export default errorHandler
