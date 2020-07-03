export const handleError = (setState, message, time = 5000, callback = () => {}) => {
    setState({
        errors: true,
        type: 'error',
        message: message
    });
    setTimeout(() => {
        setState({
            errors: false,
            message: ''
        });

        callback();
    }, time);
}

export const handleSuccess = (setState, message, time = 1000, callback = () => {}) => {
    setState({
        success: true,
        message: message
    });
    setTimeout(() => {
        setState({
            success: false,
            message: ''
        });

        callback();
    }, time);
}