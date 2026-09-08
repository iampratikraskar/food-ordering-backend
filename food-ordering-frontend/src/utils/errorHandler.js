const getErrorMessage = (error, defaultMessage = "Something went wrong.") => {

    // No response means server/network problem
    if (!error.response) {
        return "Unable to connect to the server. Please check that the backend is running.";
    }

    const status = error.response.status;
    const data = error.response.data;


    // Unauthorized
    if (status === 401) {
        return "Your session has expired. Please login again.";
    }


    // Forbidden
    if (status === 403) {
        return "You do not have permission to perform this action.";
    }


    // Not Found
    if (status === 404) {
        return "The requested resource was not found.";
    }


    // Validation errors
    if (status === 400) {

        if (data?.message) {
            return data.message;
        }

        if (typeof data === "string") {
            return data;
        }

        return "Please check the information you entered.";
    }


    // Conflict
    if (status === 409) {

        if (data?.message) {
            return data.message;
        }

        return "This data already exists.";
    }


    // Server error
    if (status >= 500) {
        return "Something went wrong on the server. Please try again later.";
    }


    // Backend message
    if (data?.message) {
        return data.message;
    }


    // String response
    if (typeof data === "string") {
        return data;
    }


    return defaultMessage;
};


export default getErrorMessage;