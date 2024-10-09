const errorHandler = (error, request, response, next) => {
    console.error(error)

    const statusCode = error.code || 500;
    const message = error.message || 'Internal Server Error';

    response.status(statusCode).json({
        error: {
            code: statusCode,
            message: message,
        },
    });
}


export default errorHandler