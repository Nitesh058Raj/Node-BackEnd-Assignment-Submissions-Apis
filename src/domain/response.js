class Response {
    constructor( statusCode, httpStatus, message, data ) {

        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.meassage = message;
        this.data = data;

    }
}

export default Response;

