export const defaultError = (status, message) => {
    const error = new Error();
    error.statusCode = status || 500;
    error.message = message || 'Something went wrong!';

    return error;
}